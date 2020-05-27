# frozen_string_literal: true

class App < DewCraft::Application
  class << self
    def queue
      @queue ||= Localjob.new
    end

    def enqueue job
      queue << job
    end

    def workers
      @workers ||= Localjob::Worker.new(App.queue, logger: App.logger).yield_self do |w|
        w.work thread: true
      end
    end

    def browser
      @browser ||= Ferrum::Browser.new(timeout: 30).yield_self do |b|
        b.contexts.create
      end
    end

    def routes
      Routes::Root.app
    end

    def scheduler
      Scheduler
    end
  end

  opts[:autoload_folders] = %w[ app app/models app/jobs ]

  # unit(:scheduler) { Scheduler }

  reload!
end
