worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true

Rufus::Scheduler.s.every "1m", ScrapeAndExtractJob::Scheduler, first: :now
