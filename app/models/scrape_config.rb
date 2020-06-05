# frozen_string_literal: true

class ScrapeConfig < Sequel::Model
  one_to_many :scrape_result

  def last_result
    scrape_result { |sr| sr.order_by(Sequel.desc(:created_at)).limit(1) }.first
  end
end
