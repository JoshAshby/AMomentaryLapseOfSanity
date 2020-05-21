# frozen_string_literal: true

require_relative "../env"

class App < Roda
  opts[:root] = __dir__

  plugin :common_logger, $stdout
  plugin :public, root: "../public"

  plugin :run_append_slash

  route do |r|
    r.public

    r.on "api" do
      r.run Api
    end

    r.run WebApp
  end
end
