class AddSuppInfoToListings < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :supp_info, :string
  end
end
