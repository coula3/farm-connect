class AddStatusToConnections < ActiveRecord::Migration[6.0]
  def change
    add_column :connections, :status, :string
  end
end
