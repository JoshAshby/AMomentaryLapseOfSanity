# frozen_string_literal: true

worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true
