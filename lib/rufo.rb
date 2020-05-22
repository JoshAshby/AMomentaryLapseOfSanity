# frozen_string_literal: true

class Rufo
  class << self
    attr_reader :instance

    def start &block
      @instance = block.call.new
      @instance.start

      LOADER.after_reload do
        @instance.stop
        @instance = nil

        @instance = block.call.new
        @instance.start
      end
    end

    def schedule &block
      @schedule ||= block
    end
  end

  def initialize
    @scheduler = Rufus::Scheduler.new
  end

  def start
    LOGGER.wait "Seting schedules"
    instance_exec @scheduler, &self.class.instance_variable_get(:@schedule)
    LOGGER.success "Set schedules"
  end

  def stop
    @scheduler.shutdown
    @scheduler = nil
  end

  def reload!
    LOGGER.wait "Reseting schedules for reload"
    @scheduler.pause

    @scheduler.jobs.each(&:unschedule)
    instance_exec @scheduler, &self.class.instance_variable_get(:@schedule)

    @scheduler.resume
    LOGGER.success "Reset schedules for reload"
  end
end
