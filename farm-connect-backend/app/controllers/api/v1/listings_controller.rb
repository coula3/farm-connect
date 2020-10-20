class Api::V1::ListingsController < ApplicationController
    skip_before_action :authorized, only: [:index]
    def index
        listings = Listing.all
        render json: ListingSerializer.new(listings)
    end
end
