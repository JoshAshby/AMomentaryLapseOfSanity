# frozen_string_literal: true

class ScrapeAndExtractJob
  class Scheduler
    def self.call
      App.logger.wait "Looking for active ScrapeConfigs"

      jb = Sequel.pg_jsonb_op(:schedule)

      last_scrape_results = ScrapeResult.distinct(:scrape_config_id).order_by(:scrape_config_id, Sequel.desc(:created_at))
      scrape_configs = ScrapeConfig.where(active: true)

      frequency_scrape_configs = scrape_configs
        .join_table(:left_outer, last_scrape_results.as(:last_result), scrape_config_id: :id)
        .where { jb.has_key?("type") }
        .where({ jb.get_text("type") => "frequency" })
        .where { Sequel[:last_result][:created_at] + jb.get_text("frequency").cast("interval") < Sequel.function("NOW") }
        .select { Sequel[:scrape_configs][:id] }
        .each  do |row|
          App.queue << ScrapeAndExtractJob.new(row[:id])
        end

      App.logger.success "Scheduled #{ frequency_scrape_configs.count } frequency based ScrapeConfigs"
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
      nodes = page.css selector
      App.logger.info "Extracted", selector: selector, nodes: nodes.length
      memo[selector] = nodes.map(&:inner_text)
    end

    page.close

    ScrapeResult.create scrape_config: @scrape_config, extractions: extractions

    App.logger.success "Done"
  end
end
