# frozen_string_literal: true

class Reloader
  def initialize folders
    @folders = folders

    @loader = Zeitwerk::Loader.new

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
