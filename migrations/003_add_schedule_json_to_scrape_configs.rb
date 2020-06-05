# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :scrape_configs do
      add_column :schedule, :jsonb, default: "{}"
    end
  end
end
