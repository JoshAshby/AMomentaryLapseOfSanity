# frozen_string_literal: true

class Routes::Root < Roda
  plugin :common_logger, $stdout
  plugin :public

  plugin :run_append_slash

  route do |r|
    r.public

    r.on "api" do
      r.run Routes::Api
    end

    r.run Routes::WebApp
  end
end
