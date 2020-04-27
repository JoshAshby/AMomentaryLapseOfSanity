class Api < Roda
  plugin :run_append_slash
  plugin :json

  route do |r|
    r.root do
      { current_version: 1 }
    end

    r.on "v1" do
      r.get "scrape_configs" do
        {
          scrape_configs: ScrapeConfig.all.map(&:values)
        }
      end
    end
  end
end
