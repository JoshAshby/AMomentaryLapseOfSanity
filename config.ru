require_relative "app"
# Allows overriding HTTP request using `_method` params
# eg _method="delete"
# use Rack::MethodOverride

# run App.freeze.app

if ENV['RACK_ENV'] == 'production'
  Zeitwerk::Loader.eager_load_all
  run App.freeze.app
else
  run ->(env) {
    LOADER.reload
    App.call env
  }
end
