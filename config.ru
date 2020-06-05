require_relative "env"

App.reload!
Scheduler.resume

Localjob::Worker.new(App.queue, logger: App.logger).yield_self do |w|
  w.work thread: true
end

if ENV["RACK_ENV"] == "production"
  Zeitwerk::Loader.eager_load_all
  run Routes::Root.freeze.app
else
  run Routes::Root.app
end
#
# require "roda"

# class App < Roda
  # route do |r|
    # r.get do
      # <<~HTML
# <!DOCTYPE html>
# <head>
  # <script src="https://unpkg.com/htmx.org@0.0.4"></script>
# </head>

# <form hx-post="https://httpbin.org/post">
  # <select name="test[]" multiple>
    # <option value="1">1</option>
    # <option value="2">2</option>
    # <option value="3">3</option>
    # <option value="4">4</option>
  # </select>
  # <input type="submit" />
# </form>

# <form method="post" action="https://httpbin.org/post">
  # <select name="test[]" multiple>
    # <option value="1">1</option>
    # <option value="2">2</option>
    # <option value="3">3</option>
    # <option value="4">4</option>
  # </select>
  # <input type="submit" />
# </form>
      # HTML
    # end
  # end
# end

# run App.app
