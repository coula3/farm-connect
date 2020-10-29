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

        listing = user.listings.create(commodity_id: commodity.id, date: listing_params[:date], availability: listing_params[:availability], measure: listing_params[:measure], quantity: listing_params[:quantity], available: available, information: listing_params[:information])

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
            update_keys_array = listing_params.keys.select {|key| listing_params[key].present?}

            if listing_params[:commodity].present?
                commodity = Commodity.find_by(name: listing_params[:commodity])
                listing.update(commodity_id: commodity.id)
                update_keys_array.slice(1..-1).each {|e| listing.update("#{e}": listing_params[e])}
            else
                update_keys_array.each {|e| listing.update("#{e}": listing_params[e])}
            end
        end
        render json: ListingSerializer.new(listing)
    end

    private
    def listing_params
        params.require(:listing).permit(:date, :commodity, :availability, :measure, :quantity, :available, :information, :closed, :userId, :interestId, :currentUserId)
    end

    def available
        listing_params[:available] == "Yes" ? true : false
    end
end
