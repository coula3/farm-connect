class Api::V1::ListingsController < ApplicationController
    def index
        if params[:id]
            listings = User.find(params[:id]).listings.where.not(closed: nil)
            render json: ListingSerializer.new(listings)
        else
            listings = Listing.where(closed: nil)
            render json: ListingSerializer.new(listings)
        end
    end

    def show
        listing = Listing.find_by(id: params[:id])
        render json: ListingSerializer.new(listing)
    end

    def create
        user = User.find_by(id: listing_params[:userId])
        commodity = Commodity.find_by(name: listing_params[:commodity])

        if commodity
            listing = user.listings.build(commodity_id: commodity.id, date: Time.now, availability: listing_params[:availability], measure: listing_params[:measure], quantity: listing_params[:quantity], available: available, information: listing_params[:information])
            if listing.save
                render json: ListingSerializer.new(listing)
            else
                render json: {messages: listing.errors.full_messages}
            end
        else
            check_attributes_presence(commodity)
        end

    end

    def update
        listing = Listing.find_by(id: params[:id].to_i)

        if listing_params[:interestId]
            interest = listing.interests.find_by(id: listing_params[:interestId])
            interest.destroy
        elsif listing_params[:currentUserId]
            interest = listing.interests.create(user_id: listing_params[:currentUserId]) if listing_params[:currentUserId]
        else
            update_keys_array = listing_params.keys
            if listing_params[:commodity].present?
                commodity = Commodity.find_by(name: listing_params[:commodity])
                listing.update(commodity_id: commodity.id)
                update_closed_column(listing)
                update_keys_array.slice(1..-2).each {|e| listing.update("#{e}": listing_params[e])}
            else
                update_closed_column(listing)
                if update_keys_array.length > 1
                    update_keys_array.slice(1..-2).each {|e| listing.update("#{e}": listing_params[e])}
                else
                    update_keys_array.each {|e| listing.update("#{e}": listing_params[e])}
                end
            end
        end
        listing.update(measure: nil) if !listing.quantity
        listing.update(available: available)
        render json: ListingSerializer.new(listing)
    end

    private
    def listing_params
        params.require(:listing).permit(:commodity, :availability, :measure, :quantity, :available, :information, :closed, :userId, :interestId, :currentUserId)
    end

    def available
        listing_params[:available] == "Yes" ? true : false
    end

    def update_closed_column(listing)
        if listing_params[:closed].present?
            listing.update(closed: Time.now)
        end
    end

    def check_attributes_presence(commodity)
        if !commodity && listing_params[:availability].present?
            render json: {messages: ["Commodity can't be blank"]}
        elsif !commodity && !listing_params[:availability].present?
            render json: {messages: ["Commodity can't be blank", "Availability can't be blank"]}
        end
    end
end
