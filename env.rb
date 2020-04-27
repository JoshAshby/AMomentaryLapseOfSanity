# frozen_string_literal: true

require "dotenv/load"

require "tty-logger"

require "zeitwerk"

require "sequel/core"
require "sequel/model"

require "rufus-scheduler"
require "localjob"

require "ferrum"

LOGGER = TTY::Logger.new do |config|
  config.level = ENV["RACK_ENV"] == "development" ? :debug : :warn
end

Sequel.extension :core_refinements, :pg_array, :pg_json, :pg_array_ops, :pg_json_ops

# Delete DATABASE_URL from the environment, so it isn't accidently
# passed to subprocesses. DATABASE_URL may contain passwords.
DB = Sequel.connect ENV.delete("DATABASE_URL"), logger: LOGGER

if ENV['RACK_ENV'] == 'development'
  Sequel::Model.cache_associations = false
end

Sequel::Model.plugin :auto_validations
Sequel::Model.plugin :prepared_statements
Sequel::Model.plugin :subclasses unless ENV['RACK_ENV'] == "development"
# Sequel::Model.plugin :dirty
# Sequel::Model.db.extension(:pagination)

# Sequel::Model.raise_on_save_failure = false

browser = Ferrum::Browser.new timeout: 30
BROWSER_CONTEXT = browser.contexts.create

BackgroundQueue = Localjob.new

loader = Zeitwerk::Loader.new
%w[ models jobs routes ].each &loader.method(:push_dir)
loader.enable_reloading

loader.setup
