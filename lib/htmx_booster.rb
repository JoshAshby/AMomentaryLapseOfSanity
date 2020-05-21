module HTMXBooster
  # Helpers for responding to HTMX requests with no layout, or handling
  # redirects differently.
  module InstanceMethods
    def htmx_render(*args, &block)
      if request.headers["X-HX-Request"] == "true"
        render(*args, &block)
      else
        view(*args, &block)
      end
    end

    def htmx_redirect path, *args, &block
      if request.headers["X-HX-Request"] == "true"
        response.headers["X-HX-Push"] = path

        # This is because htmx doesn't set the url if you redirect because
        # reasons, so instead you have to render the new route. I wonder if
        # there is a way to get roda to do that here automatically?
        instance_exec(&block) if block
      else
        response.redirect path, *args
      end
    end
  end
end
