# frozen_string_literal: true

Sequel.migration do
  change do
    create_table "scrape_configs" do
      primary_key :id

      text :url, null: false
      column :extraction_selectors, "text[]", default: "{}"

      Time :updated_at, default: Sequel::CURRENT_TIMESTAMP
      Time :created_at, default: Sequel::CURRENT_TIMESTAMP
    end

    create_table "scrape_results" do
      primary_key :id
      foreign_key :scrape_config_id, :scrape_configs

      column :extractions, :json, default: "{}"

      Time :updated_at, default: Sequel::CURRENT_TIMESTAMP
      Time :created_at, default: Sequel::CURRENT_TIMESTAMP
    end
  end
end
