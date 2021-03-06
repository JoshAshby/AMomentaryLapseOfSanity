# frozen_string_literal: true

module Rufo
  def self.configure app
    app.opts[:scheduler] = Rufus::Scheduler
  end

  module ClassMethods
    def inherited subclass
      super

      return unless block = @raw_scheduler_block

      subclass.schedule(&block)
    end

    def schedule &block
      fail DewCraftError, "no block passed to schedule" unless block

      @raw_schedule_block = block
      @schedule_block = block = convert_block block

      public define_method(:_main_run_block, &block)

      stop
    end
  end

  module InstanceMethods
    def initialize env
      super

      klass = self.class
      @scheduler = klass.opts[:scheduler].new
    end

    def _main_stop_block
      @scheduler.shutdown
    end

    def _handle_main_run_block
      catch :halt do
        _main_run_block(@scheduler)
      end
    end
  end
end

DewCraft::Unit::DewCraftPlugins.register_plugin :rufo, Rufo
