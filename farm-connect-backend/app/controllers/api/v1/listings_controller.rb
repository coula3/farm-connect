class Api::V1::ListingsController < ApplicationController
    def index
        listings = Listing.all
        render json: ListingSerializer.new(listings)
    end

    def show
        listing = Listing.find_by(id: params[:id])
        render json: ListingSerializer.new(listing)
    end

    def create
        user = User.find_by(id: listing_params[:userId])
        commodity = Commodity.find_by(name: listing_params[:commodity])
        available = listing_params[:available] == "Yes" ? true : false

        listing = user.listings.create(commodity_id: commodity.id, list_date: listing_params[:listDate], est_availability: listing_params[:estAvailability], measure: listing_params[:measure], quantity: listing_params[:quantity], available: available, supp_info: listing_params[:suppInfo])

        render json: ListingSerializer.new(listing)
    end

    def update
        listing = Listing.find_by(id: params[:id].to_i)

        if listing_params[:interestId]
            interest = listing.interests.find_by(id: listing_params[:interestId])
            interest.destroy
        end

        interest = listing.interests.create(user_id: listing_params[:currentUserId]) if listing_params[:currentUserId]

        render json: ListingSerializer.new(listing)
    end

    private
    def listing_params
        params.require(:listing).permit(:listDate, :commodity, :estAvailability, :measure, :quantity, :available, :suppInfo, :userId, :interestId, :currentUserId)
    end
end
