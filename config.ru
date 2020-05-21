require_relative "env"
require_relative "app/scheduler"

if ENV["RACK_ENV"] == "production"
  Zeitwerk::Loader.eager_load_all
  run App.freeze.app
else
  run ->(env) {
    LOADER.reload
    App.call env
  }
end
