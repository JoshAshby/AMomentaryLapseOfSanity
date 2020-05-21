using Sequel::CoreRefinements

class WebApp < Roda
  plugin :request_headers

  plugin :render, views: "app/views"
  plugin :content_for

  route do |r|
    # Helps HTMX on redirects by always pushing the current URL to history
    response.headers["X-HX-Push"] = r.path

    r.on "scrape_config" do
      r.on Integer do |id|
        @scrape_config = ScrapeConfig[id]

        r.post "delete" do
          @scrape_config.scrape_result.each(&:delete)
          @scrape_config.delete

          r.redirect "/"
        end

        r.get do
          view "scrape_configs/edit"
        end

        r.post do
          @scrape_config.update r.params

          r.redirect "/"
        end
      end

      r.get "new" do
        view "scrape_configs/new"
      end

      r.post do
        @scrape_config = ScrapeConfig.create r.params

        r.redirect "/scrape_config/#{ @scrape_config.id }"
      end
    end

    r.root do
      @scrape_configs = ScrapeConfig.all
      view :index
    end
  end
end
