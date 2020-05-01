using Sequel::CoreRefinements

class Api < Roda
  plugin :all_verbs

  plugin :json
  plugin :json_parser

  route do |r|
    r.root do
      { current_version: 1 }
    end

    r.on "v1" do
      r.on "site" do
        r.get do
          {
            scrape_config: ScrapeConfig.find_or_create(url: r.params["url"]).values
          }
        end
      end

      r.on "scrape_config" do
        r.on String do |id|
          @scrape_config = ScrapeConfig[id]

          r.on "extraction" do
            r.on Integer do |idx|
              r.delete do
                @scrape_config.extraction_selectors.delete_at(idx)
                @scrape_config.save

                { scrape_config: @scrape_config.values }
              end
            end
          end

          r.get do
            { scrape_config: @scrape_config.values }
          end

          r.patch do
            @scrape_config.update r.params
            @scrape_config.save

            { scrape_config: @scrape_config.values }
          end

          r.delete do
            @scrape_config.delete

            { scrape_config: @scrape_config.values, deleted: true }
          end
        end

        r.get do
          {
            scrape_configs: ScrapeConfig.all.map(&:values)
          }
        end

        r.post do
          scrape_config = ScrapeConfig.create r.params

          {
            scrape_config: scrape_config.values
          }
        end
      end
    end
  end
end
