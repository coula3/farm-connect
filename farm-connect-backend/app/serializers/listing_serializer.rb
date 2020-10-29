class ListingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :commodity_id, :date, :availability, :available, :measure, :quantity, :information, :closed, :user, :commodity, :interests
end