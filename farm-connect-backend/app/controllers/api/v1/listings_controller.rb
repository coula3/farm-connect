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

        listing = user.listings.create(commodity_id: commodity.id, list_date: listing_params[:listDate], est_availability: listing_params[:estAvailability], measure: listing_params[:measure], quantity: listing_params[:quantity], available: available, supp_info: listing_params[:suppInfo])

        render json: ListingSerializer.new(listing)
    end

    def update
        listing = Listing.find_by(id: params[:id].to_i)

        if listing_params[:interestId]
            interest = listing.interests.find_by(id: listing_params[:interestId])
            interest.destroy
        elsif listing_params[:currentUserId]
            interest = listing.interests.create(user_id: listing_params[:currentUserId]) if listing_params[:currentUserId]
        else
            commodity = Commodity.find_by(name: listing_params[:commodity])
            listing.update(commodity_id: commodity.id, est_availability: listing_params[:estAvailability], measure: listing_params[:measure], quantity: listing_params[:quantity], available: available, supp_info: listing_params[:suppInfo], close_listing: listing_params[:closeListing])
        end

        render json: ListingSerializer.new(listing)
    end

    private
    def listing_params
        params.require(:listing).permit(:listDate, :commodity, :estAvailability, :measure, :quantity, :available, :suppInfo, :closeListing, :userId, :interestId, :currentUserId)
    end

    def available
        listing_params[:available] == "Yes" ? true : false
    end
end
