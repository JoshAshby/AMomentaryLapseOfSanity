# frozen_string_literal: true

class ScrapeAndExtractJob
  class Scheduler
    def self.call
      App.logger.wait "Looking for active ScrapeConfigs"

      scrape_configs = ScrapeConfig.where(active: true).select(:id).each do |row|
        App.enqueue ScrapeAndExtractJob.new(row[:id])
      end

      App.logger.success "Scheduled #{ scrape_configs.count } ScrapeConfigs"
    end
  end

  def initialize scrape_config_id
    @scrape_config = ScrapeConfig[scrape_config_id]
  end

  def perform
    App.logger.wait "Starting scrape", scrape_config: @scrape_config

    page = App.browser.create_page
    page.goto @scrape_config[:url]

    extractions = @scrape_config[:extraction_selectors].each_with_object({}) do |selector, memo|
      result = page.at_css selector
      App.logger.info "Extracted", selector: selector, text: result.inner_text
      memo[selector] = result.inner_text
    end

    page.close

    ScrapeResult.create scrape_config: @scrape_config, extractions: extractions

    App.logger.success "Done"
  end
end
