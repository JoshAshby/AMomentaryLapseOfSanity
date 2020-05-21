# frozen_string_literal: true

require "dotenv/load"

ENV["RACK_ENV"] ||= "development"

require "bundler"
Bundler.require :default, ENV["RACK_ENV"].to_sym

LOGGER = TTY::Logger.new do |config|
  config.level = ENV["RACK_ENV"] == "development" ? :info : :warn
end

# Delete DATABASE_URL from the environment, so it isn't accidently
# passed to subprocesses. DATABASE_URL may contain passwords.
DB = Sequel.connect ENV.delete("DATABASE_URL"), logger: LOGGER
DB.sql_log_level = :debug

Sequel.extension :core_refinements, :pg_array_ops, :pg_json_ops
Sequel::Model.db.extension :pg_array, :pg_json

Sequel::Model.plugin :timestamps, update_on_create: true

Sequel::Model.cache_associations = false if ENV["RACK_ENV"] == "development"

# Sequel::Model.plugin :auto_validations
# Sequel::Model.plugin :prepared_statements
# Sequel::Model.plugin :subclasses unless ENV["RACK_ENV"] == "development"
# Sequel::Model.plugin :dirty
# Sequel::Model.db.extension(:pagination)

# Sequel::Model.raise_on_save_failure = false

browser = Ferrum::Browser.new timeout: 30
BROWSER_CONTEXT = browser.contexts.create

BackgroundQueue = Localjob.new

Thread.abort_on_exception = true
trap 'INT' do exit end
trap 'TERM' do exit end

LOADER = Zeitwerk::Loader.new
# LOADER.log!
# LOADER.push_dir __dir__
# %w[ bin migrations public views ].each(&LOADER.method(:ignore))
%w[ lib app app/models app/jobs app/routes ].each(&LOADER.method(:push_dir))
LOADER.enable_reloading

LOADER.setup
