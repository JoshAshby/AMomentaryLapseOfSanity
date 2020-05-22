require_relative "env"
require_relative "app/worker"

require_relative "app/scheduler"

Scheduler.start

if ENV["RACK_ENV"] == "production"
  Zeitwerk::Loader.eager_load_all
  run App.freeze.app
else
  run ->(env) { App.call env }
end
