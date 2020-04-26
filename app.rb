# frozen_string_literal: true

require 'dotenv/load'

require 'tty-LOGGER'

require 'sequel'

require 'rufus-scheduler'
require 'localjob'

require 'ferrum'

Sequel.extension :pg_array, :pg_json, :pg_array_ops, :pg_json_ops

Sequel.extension :core_refinements
using Sequel::CoreRefinements

LOGGER = TTY::Logger.new do |config|
  config.level = :debug
end

ferrum_logger = Struct.new "FerrumLogger" do
  def puts(*args)
    LOGGER.debug(*args)
  end
end

browser = Ferrum::Browser.new timeout: 30#, logger: ferrum_logger.new
CONTEXT = browser.contexts.create

scheduler = Rufus::Scheduler.new

BackgroundQueue = Localjob.new

worker = Localjob::Worker.new BackgroundQueue, logger: LOGGER
worker_thread = worker.work thread: true

# worker_thread.thread_variable_set :context, CONTEXT
# worker_thread.thread_variable_set :logger, LOGGER

# Delete APP_DATABASE_URL from the environment, so it isn't accidently
# passed to subprocesses.  APP_DATABASE_URL may contain passwords.
DB = Sequel.connect ENV.delete('APP_DATABASE_URL') || ENV.delete('DATABASE_URL'), logger: LOGGER

DB.create_table? "scrape_configs" do
  primary_key :id

  text :url, null: false
  column :extraction_selectors, "text[]"

  Time :updated_at, default: "NOW()"
  Time :created_at, default: "NOW()"
end

DB.create_table? "scrape_results" do
  primary_key :id
  foreign_key :scrape_config_id, :scrape_configs

  column :extractions, :json

  Time :updated_at, default: "NOW()"
  Time :created_at, default: "NOW()"
end

class ScrapeAndExtractJob
  def initialize scrape_config_id
    @scrape_config = DB[:scrape_configs].first id: scrape_config_id
  end

  def perform
    LOGGER.wait "Starting scrape", scrape_config: @scrape_config

    page = CONTEXT.create_page
    page.goto @scrape_config[:url]

    @scrape_config[:extraction_selectors].each do |selector|
      result = page.at_css selector
      LOGGER.info "Extracted", selector: selector, text: result.inner_text
    end

    page.screenshot path: "tb.png"

    page.close

    LOGGER.success "Done, wrote to tb.png"
  end
end

def schedule
  DB[:scrape_configs].select(:id).each do |row|
    BackgroundQueue << ScrapeAndExtractJob.new(row[:id])
  end
end

scheduler.every '1m' do
  schedule
end


LOGGER.wait "Working ..."
schedule

loop do
  trap "INT" do
    return
  end

  sleep 1
end

CONTEXT.dispose
browser.quit
worker.shutdown
