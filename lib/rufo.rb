class Rufo
  def self.schedule &block
    @schedule ||= block
  end

  def self.start
    instance = new

    LOADER.after_reload do
      instance.reload!
    end

    instance.start
  end

  def block_for name
    ->() { Object.const_get(name).call }
  end

  def start
    Rufus::Scheduler.s.tap do |s|
      LOGGER.wait "Seting schedules"
      instance_exec s, &self.class.instance_variable_get(:@schedule)
      LOGGER.success "Set schedules"
    end
  end

  def reload!
    Rufus::Scheduler.s.tap do |s|
      LOGGER.wait "Reseting schedules for reload"
      s.pause

      s.jobs.each(&:unschedule)
      instance_exec s, &self.class.instance_variable_get(:@schedule)

      s.resume
      LOGGER.success "Reset schedules for reload"
    end
  end
end
