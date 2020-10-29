class AddCloseListingToListings < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :close_listing, :datetime
  end
end
