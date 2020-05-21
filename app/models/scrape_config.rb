# frozen_string_literal: true

class ScrapeConfig < Sequel::Model
  one_to_many :scrape_result
end
