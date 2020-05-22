require_relative "env"

require_relative "app/worker"
require_relative "app/scheduler"

Rufo.start { Scheduler }

if ENV["RACK_ENV"] == "production"
  Zeitwerk::Loader.eager_load_all
  run Routes::Root.freeze.app
else
  run ->(env) { Routes::Root.call env }
end
