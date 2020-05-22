# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

gem "dotenv", require: false

gem "zeitwerk"

gem "rake"
gem "tty-logger"

gem "thin"
gem "roda"
gem "tilt"

gem "sequel"
gem "sequel_pg", require: "sequel"

gem "rufus-scheduler"
gem "localjob"

gem "ferrum"

group :development do
  gem "listen"

  gem "rubocop"

  gem "sequel-annotate"
end

group :test do
end

group :test, :development do
  gem "break"
end
