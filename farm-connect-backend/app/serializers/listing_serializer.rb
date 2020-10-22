class ListingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :commodity_id, :list_date, :est_availability, :available, :measure, :quantity, :supp_info, :user, :commodity, :interests
end