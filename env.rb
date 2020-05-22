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

class Reloader
  def initialize folders
    @folders = folders

    @loader = Zeitwerk::Loader.new

    @after_reload = []

    @lock = Mutex.new

    @folders.each(&@loader.method(:push_dir))
  end

  def start
    setup_listener if ENV["RACK_ENV"] == "development"

    @loader.setup

    notify_after_reload
  end

  def after_reload &block
    @after_reload << block
    block
  end

  def reload!
    return unless @loader.reloading_enabled?

    @lock.synchronize do
      @loader.reload
      notify_after_reload
    end
  end

  protected

  def setup_listener
    @loader.enable_reloading

    Listen.to(*@folders, wait_for_delay: 1) do
      reload!
    end.start
  end

  def notify_after_reload
    @after_reload.each(&:call)
  end
end

LOADER = Reloader.new %w[ lib app app/models app/jobs app/routes ]
LOADER.start
