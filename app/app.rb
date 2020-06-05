# frozen_string_literal: true

class App < DewCraft::Application
  class << self
    def queue
      @queue ||= Localjob.new
    end

    def browser
      @browser ||= Ferrum::Browser.new(timeout: 30).yield_self do |b|
        b.contexts.create
      end
    end
  end

  opts[:autoload_folders] = %w[ app app/models app/jobs ]

  # unit(:scheduler) { Scheduler }

  # reload!
end
