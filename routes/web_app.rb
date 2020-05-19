using Sequel::CoreRefinements

class WebApp < Roda
  # plugin :all_verbs

  plugin :request_headers

  plugin :render
  plugin :content_for


  route do |r|
    r.on Integer do |id|
      @scrape_config = ScrapeConfig[id]

      r.get "edit" do
        render "scrape_configs/table_edit", locals: { scrape_config: @scrape_config }
      end

      r.get do
        render "scrape_configs/table_index", locals: { scrape_config: @scrape_config }
      end

      r.post do
        puts r.params
        @scrape_config.update r.params

        render "scrape_configs/table_index", locals: { scrape_config: @scrape_config }
      end
    end

    r.root do
      @scrape_configs = ScrapeConfig.all
      view :index
    end
  end
end
