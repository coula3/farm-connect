# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Farmer.create(first_name: "Jeff", last_name: "Druff", email: "j@druff.com", state: "North Carolina")
# Farmer.create(first_name: "Lisa", last_name: "Vikes", email: "l@vikes.com", state: "Iowa")

# Prospect.create(first_name: "Sue", last_name: "May", email: "s@may.com", state: "Indiana")
# Prospect.create(first_name: "Ann", last_name: "Moe", email: "a@moe.com", state: "Kansas")
# puts "Completed!"

require 'csv'

FILE_PATH = "/Users/acoulson/Development/code/farm-connect/farm-connect-backend/db"

items = []

CSV.foreach("#{FILE_PATH}/commodity.csv", headers: true) do |row|
    items << row.to_h
end

Commodity.import(items)