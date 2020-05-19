# frozen_string_literal: true

require_relative "env"

worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true

Rufus::Scheduler.s.every "1m", ScrapeAndExtractJob::Scheduler, first: :now

class App < Roda
  opts[:root] = __dir__

  plugin :common_logger, $stdout
  plugin :public, root: "public"
  plugin :render
  plugin :content_for

  plugin :run_append_slash

  plugin :multi_run

  # wrapped like this so that Zeitwerk will reload the class
  run "api", ->(env) { Api.call env }
  run "app", ->(env) { WebApp.call env }

  route do |r|
    r.public
    r.multi_run

    r.root do
      r.redirect "/app"
    end
  end
end
