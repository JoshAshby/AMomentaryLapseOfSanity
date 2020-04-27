# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

gem "dotenv", group: :development

gem "zeitwerk"

gem "rake"
gem "tty-logger"

gem "roda"

gem "sequel"
gem "sequel_pg", require: "sequel"

gem "rufus-scheduler"
gem "localjob"

gem "ferrum"

group :development do
  gem "rubocop"

  gem "sequel-annotate"
end

group :test do
end

group :test, :development do
  gem "break"
end