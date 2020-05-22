worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true

LOADER.after_reload do
  LOGGER.wait "Reseting schedules for reload"

  Rufus::Scheduler.s.pause

  Rufus::Scheduler.s.jobs.each(&:unschedule)

  Rufus::Scheduler.s.every "1m", first: :now do
    Object.const_get("ScrapeAndExtractJob::Scheduler").call
  end

  Rufus::Scheduler.s.resume

  LOGGER.success "Reset schedules for reload"
end.call
