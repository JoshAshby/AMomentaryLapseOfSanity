# frozen_string_literal: true
require_relative "../lib/rufo"

class Scheduler < DewCraft::Unit
  plugin :rufo

  schedule do |s|
    s.every "1m", ScrapeAndExtractJob::Scheduler, first: :now
  end
end
