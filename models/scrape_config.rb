class ScrapeConfig < Sequel::Model
  one_to_many :scrape_result
end
