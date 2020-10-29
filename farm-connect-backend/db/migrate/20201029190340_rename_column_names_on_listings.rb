class RenameColumnNamesOnListings < ActiveRecord::Migration[6.0]
  def change
    rename_column :listings, :list_date, :date
    rename_column :listings, :est_availability, :availability
    rename_column :listings, :supp_info, :information
    rename_column :listings, :close_listing, :closed
  end
end