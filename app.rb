# frozen_string_literal: true

require "roda"
require_relative "env"

worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker.work thread: true

Rufus::Scheduler.s.every "1m" do
  ScrapeConfig.select(:id).each do |row|
    BackgroundQueue << ScrapeAndExtractJob.new(row[:id])
  end
end

class App < Roda
  plugin :public
  plugin :json

  route do |r|
    r.public

    r.root do
      {
        v: 0.1
      }
    end
  end
end
