class Api < Roda
  plugin :json
  plugin :json_parser

  route do |r|
    r.root do
      { current_version: 1 }
    end

    r.on "v1" do
      r.on "scrape_configs" do
        r.on String do |id|
          r.get do
            { scrape_config: ScrapeConfig[id].values }
          end

          r.post do
            binding.irb
          end
        end

        r.is do
          r.get do
            {
              scrape_configs: ScrapeConfig.all.map(&:values)
            }
          end
        end
      end
    end
  end
end
