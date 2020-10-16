class CreateConnects < ActiveRecord::Migration[6.0]
  def change
    create_table :connects do |t|
      t.references :farmer, null: false, foreign_key: true
      t.references :prospect, null: false, foreign_key: true

      t.timestamps
    end
  end
end
