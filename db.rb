# frozen_string_literal: true

# Delete DATABASE_URL from the environment, so it isn't accidently
# passed to subprocesses. DATABASE_URL may contain passwords.
DB = Sequel.connect ENV.delete("DATABASE_URL"), logger: App.logger
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
