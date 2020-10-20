# require 'csv'

# #FARMER SEED DATA
# Farmer.create(first_name: "Jeff", last_name: "Druff", email: "j@druff.com", state: "North Carolina")
# Farmer.create(first_name: "Lisa", last_name: "Vikes", email: "l@vikes.com", state: "Iowa")

# #PROSPECT SEED DATA
# Prospect.create(first_name: "Sue", last_name: "May", email: "s@may.com", state: "Indiana")
# Prospect.create(first_name: "Ann", last_name: "Moe", email: "a@moe.com", state: "Kansas")
# puts "Completed!"

# #COMMODITY SEED DATA
# FILE_PATH = "/Users/acoulson/Development/code/farm-connect/farm-connect-backend/db"

# items = []

# CSV.foreach("#{FILE_PATH}/commodity.csv", headers: true) do |row|
#     items << row.to_h
# end

# Commodity.import(items)

# #LISTING SEED DATA
farmers = User.where(type: "Farmer")
wheat = Commodity.find_by(name: "Wheat")
yam = Commodity.find_by(name: "Yam")
tomatoes = Commodity.find_by(name: "Tomatoes")

listing1 = farmers.first.listings.create(commodity_id: wheat.id, list_date: Time.now)
listing2 = farmers.second.listings.create(commodity_id: yam.id, list_date: Time.now)
listing3 = farmers.second.listings.create(commodity_id: wheat.id, list_date: Time.now)
listing4 = farmers.last.listings.create(commodity_id: tomatoes.id, list_date: Time.now)
