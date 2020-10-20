class ListingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :commodity_id, :list_date, :est_availability, :available, :measure, :quantity, :user, :commodity
end