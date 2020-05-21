using Sequel::CoreRefinements

class WebApp < Roda
  plugin :request_headers

  plugin :render, views: "app/views"
  plugin :content_for

  plugin HTMXBooster

  route do |r|
    r.on "scrape_config" do
      r.on Integer do |id|
        @scrape_config = ScrapeConfig[id]

        r.post "delete" do
          @scrape_config.scrape_result.each(&:delete)
          @scrape_config.delete

          htmx_redirect "/" do
            @scrape_configs = ScrapeConfig.all
            view :index
          end
        end

        r.get do
          view "scrape_configs/edit"
        end

        r.post do
          @scrape_config.update r.params

          htmx_redirect "/" do
            @scrape_configs = ScrapeConfig.all
            view :index
          end
        end
      end

      r.get "new" do
        view "scrape_configs/new"
      end

      r.post do
        @scrape_config = ScrapeConfig.create r.params

        htmx_redirect "/scrape_config/#{ @scrape_config.id }" do
          view "scrape_configs/edit"
        end
      end
    end

    r.root do
      @scrape_configs = ScrapeConfig.all
      view :index
    end
  end
end
