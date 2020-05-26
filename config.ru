require_relative "env"

App.workers
App.scheduler

if ENV["RACK_ENV"] == "production"
  Zeitwerk::Loader.eager_load_all
  run App.routes.freeze.app
else
  run App.routes
end
