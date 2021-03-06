# frozen_string_literal: true

MIGRATION_DIR = "migrations"

migrate = lambda do |version|
  require_relative "env"
  Sequel.extension :migration
  Sequel::Migrator.apply(DB, MIGRATION_DIR, version)
end

namespace :db do
  desc "migrate up"
  task :migrate do
    migrate.call(nil)
  end

  desc "migrate all the way to 0"
  task :down, [:version] do |_, args|
    version = (args[:version] || 0).to_i
    migrate.call(version)
  end

  desc "rollback version"
  task :rollback do |_, _args|
    current_version = DB.fetch("SELECT * FROM schema_info").first[:version]
    migrate.call(current_version - 1)
  end
end
