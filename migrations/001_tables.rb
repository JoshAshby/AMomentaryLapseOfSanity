# frozen_string_literal: true

Sequel.migration do
  change do
    create_table "scrape_configs" do
      primary_key :id

      text :url, null: false
      column :extraction_selectors, "text[]"

      Time :updated_at, default: "NOW()"
      Time :created_at, default: "NOW()"
    end

    create_table "scrape_results" do
      primary_key :id
      foreign_key :scrape_config_id, :scrape_configs

      column :extractions, :json

      Time :updated_at, default: "NOW()"
      Time :created_at, default: "NOW()"
    end
  end
end
