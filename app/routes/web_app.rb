using Sequel::CoreRefinements

module HTMXBoostRender
  module InstanceMethods
    def htmx_render(*args, &block)
      if request.headers["X-HX-Request"] == "true"
        render(*args, &block)
      else
        view(*args, &block)
      end
    end
  end
end

class WebApp < Roda
  plugin :request_headers

  plugin :render, views: "app/views"
  plugin :content_for

  plugin HTMXBoostRender

  route do |r|
    r.on "scrape_config" do
      r.on Integer do |id|
        @scrape_config = ScrapeConfig[id]

        r.post "delete" do
          @scrape_config.scrape_result.each(&:delete)
          @scrape_config.delete

          response.status = 200
          return
        end

        r.get do
          htmx_render "scrape_configs/edit"
        end

        r.post do
          @scrape_config.update r.params

          r.redirect "/"
        end
      end

      r.get "new" do
        htmx_render "scrape_configs/new"
      end

      r.post do
        config = ScrapeConfig.create r.params

        r.redirect "/scrape_config/#{ config.id }"
      end
    end

    r.root do
      @scrape_configs = ScrapeConfig.all
      htmx_render :index
    end
  end
end
