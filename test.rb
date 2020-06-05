require "roda"

class App < Roda
  route do |r|
    r.get "" do
      <<~HTML
        <!DOCTYPE html>
        <head>
          <script src="" />
        </head>

        <form hx-post="/">
          <input type="submit" />
          <button name="test" value="some value">Test</button>
        </form>
      HTML
    end

    r.post do
      puts r.params
    end
  end
end
