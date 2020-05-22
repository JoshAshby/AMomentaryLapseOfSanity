# frozen_string_literal: true

class Scheduler < Rufo
  schedule do |s|
    s.every "1m", ScrapeAndExtractJob::Scheduler, first: :now
  end
end
