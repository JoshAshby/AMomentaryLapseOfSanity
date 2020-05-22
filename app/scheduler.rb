class Scheduler < Rufo
  schedule do |s|
    s.every "1m", first: :now, &block_for("ScrapeAndExtractJob::Scheduler")
  end
end
