# frozen_string_literal: true

class DewCraft
  class DewCraftError < StandardError; end

  class Reloader
    def initialize folders
      @folders = folders

      @loader = Zeitwerk::Loader.new
      # @loader.log!

      @after_reload = []

      @lock = Mutex.new

      @folders.each(&@loader.method(:push_dir))
    end

    def start
      setup_listener if ENV["RACK_ENV"] == "development"

      @loader.setup

      notify_after_reload
    end

    def after_reload &block
      @after_reload << block
      block
    end

    def reload!
      return unless @loader.reloading_enabled?

      @lock.synchronize do
        @loader.reload
        notify_after_reload
      end
    end

    protected

    def setup_listener
      @loader.enable_reloading

      Listen.to(*@folders, wait_for_delay: 1) do
        reload!
      end.start
    end

    def notify_after_reload
      @after_reload.each(&:call)
    end
  end

  @application = nil

  class << self
    attr_reader :application
  end

  class Application
    @opts = {}
    @logger = TTY::Logger.new do |config|
      config.level = ENV["RACK_ENV"] == "development" ? :info : :warn
    end

    class << self
      attr_reader :opts, :logger

      def inherited subclass
        super
        subclass.instance_variable_set(:@opts, opts.dup)
        subclass.instance_variable_set(:@logger, logger.copy(app: subclass.name))
        @application = subclass.new
      end

      def reload!
        reloader
      end

      def reloader
        @reloader ||= Reloader.new(opts[:autoload_folders]).tap do |reloader|
          reloader.start
        end
      end

      # def set key, &block
        # define_singleton_method key do
          # reloader
          # block.call
        # end
      # end

      def unit key, &block
        define_singleton_method key do
          reloader.after_reload do
            block.call.tap do |i|
              i.stop
              i.start nil
            end
          end.call
        end
      end
    end
  end

  class Unit
    @app = nil
    @instance = nil
    @opts = {}

    module DewCraftPlugins
      @plugins = {}

      def self.load_plugin(name)
        h = @plugins

        unless plugin = h[name]
          require "dew_craft/plugins/#{name}"
          raise DewCraftError, "Plugin #{name} did not register itself correctly in DewCraft::DewCraftPlugins" unless plugin = h[name]
        end

        plugin
      end

      def self.register_plugin(name, mod)
        @plugins[name] = mod
      end

      module Base
        module ClassMethods
          attr_reader :opts
          attr_reader :reloader

          def inherited(subclass)
            opts[:subclassed] = true

            super

            subclass.instance_variable_set(:@reloader, reloader.dup)

            subclass.instance_variable_set(:@opts, opts.dup)
            subclass.opts.delete(:subclassed)
            subclass.opts.to_a.each do |k,v|
              if (v.is_a?(Array) || v.is_a?(Hash))
                subclass.opts[k] = v.dup
              end
            end
          end

          def plugin(plugin, *args, &block)
            raise DewCraftError, "Cannot add a plugin to a frozen Roda class" if frozen?

            plugin = DewCraftPlugins.load_plugin(plugin) if plugin.is_a?(Symbol)
            raise DewCraftError, "Invalid plugin type: #{plugin.class.inspect}" unless plugin.is_a?(Module)

            plugin.load_dependencies(self, *args, &block) if plugin.respond_to?(:load_dependencies)

            include(plugin::InstanceMethods) if defined?(plugin::InstanceMethods)
            extend(plugin::ClassMethods) if defined?(plugin::ClassMethods)

            # self::RodaRequest.send(:include, plugin::RequestMethods) if defined?(plugin::RequestMethods)
            # self::RodaRequest.extend(plugin::RequestClassMethods) if defined?(plugin::RequestClassMethods)
            # self::RodaResponse.send(:include, plugin::ResponseMethods) if defined?(plugin::ResponseMethods)
            # self::RodaResponse.extend(plugin::ResponseClassMethods) if defined?(plugin::ResponseClassMethods)

            plugin.configure(self, *args, &block) if plugin.respond_to?(:configure)
          end

          def build_run_app
            @app = -> (env) { new(env) }
          end

          def app
            @app || build_run_app
          end

          def start env
            @instance = app.call(env)
            @instance._handle_main_run_block
          end

          def stop
            @instance._handle_main_stop_block if @instance
            @instance = nil
            @app = nil
          end

          def convert_block block
            block
          end
        end

        module InstanceMethods
          def initialize env; end

          def opts
            self.klass.opts
          end

          def stop; end

          def _handle_main_run_block
            catch :halt do
              _main_run_block
            end
          end

          def _handle_main_stop_block
            catch :halt do
              _main_stop_block
            end
          end

          def _main_run_block; end
          def _main_stop_block; end
        end
      end
    end

    extend DewCraftPlugins::Base::ClassMethods
    plugin DewCraftPlugins::Base
  end
end
