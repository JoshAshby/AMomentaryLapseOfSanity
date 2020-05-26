# frozen_string_literal: true

require "dotenv/load"

ENV["RACK_ENV"] ||= "development"

require "bundler"
Bundler.require :default, ENV["RACK_ENV"].to_sym

Thread.abort_on_exception = true
trap("INT") { exit }
trap("TERM") { exit }

require_relative "lib/dew_craft"
require_relative "app/app"
require_relative "db"
