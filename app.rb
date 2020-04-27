# frozen_string_literal: true

require "roda"

require_relative "env"

worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true

# Rufus::Scheduler.s.every "1m", first: :now do
  # ScrapeConfig.select(:id).each do |row|
    # BackgroundQueue << ScrapeAndExtractJob.new(row[:id])
  # end
# end

class App < Roda
  plugin :public
  plugin :render

  plugin :run_append_slash

  plugin :multi_run

  # wrapped like this so that Zeitwerk will reload the class
  run "api", ->(env) { Api.call env }

  route do |r|
    r.public
    r.multi_run

    r.root do
      view :index
    end
  end
end
