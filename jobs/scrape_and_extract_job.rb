# frozen_string_literal: true

class ScrapeAndExtractJob
  def initialize scrape_config_id
    @scrape_config = ScrapeConfig[scrape_config_id]
  end

  def perform
    LOGGER.wait "Starting scrape", scrape_config: @scrape_config

    page = BROWSER_CONTEXT.create_page
    page.goto @scrape_config[:url]

    extractions = {}

    @scrape_config[:extraction_selectors].each do |selector|
      result = page.at_css selector
      LOGGER.info "Extracted", selector: selector, text: result.inner_text
      extractions[selector] = result.inner_text
    end

    # page.screenshot path: "tb.png"

    page.close

    ScrapeResult.create scrape_config: @scrape_config, extractions: extractions

    LOGGER.success "Done"
  end
end
