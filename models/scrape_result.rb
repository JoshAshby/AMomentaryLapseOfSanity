class ScrapeResult < Sequel::Model
  many_to_one :scrape_config
end
