class CreateListings < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :commodity, null: false, foreign_key: true
      t.datetime :list_date
      t.datetime :est_availability
      t.string :available
      t.string :measure
      t.float :quantity

      t.timestamps
    end
  end
end
