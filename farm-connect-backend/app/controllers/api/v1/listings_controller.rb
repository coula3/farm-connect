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
                check_available(listing)
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
            add_interest(listing)
        elsif listing_params[:currentUserId]
            remove_interest(listing)
        else
            update_keys_array = listing_params.keys
            if listing_params[:commodity].present?
                update_all_columns(listing, update_keys_array)
            else
                update_closed_column(listing)
                update_remaining_columns(update_keys_array)
            end
        end
        courtesy_updates(listing)
        return_json(listing)
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

    def courtesy_updates(listing)
        listing.update(quantity: nil, measure: nil) if !listing.quantity || listing.quantity == 0
        listing.update(available: available)
        check_available(listing)
    end

    def check_available(listing)
        listing.update(available: true) if listing.availability && listing.availability == Date.today && !listing.available
        listing.update(available: false) if listing.availability && listing.availability > Date.today && listing.available
    end

    def add_interest(listing)
        interest = listing.interests.find_by(id: listing_params[:interestId])
        interest.destroy
    end

    def remove_interest(listing)
        interest = listing.interests.create(user_id: listing_params[:currentUserId]) if listing_params[:currentUserId]
    end

    def update_remaining_columns(update_keys_array)
        if update_keys_array.length > 1
            update_keys_array.slice(1..-2).each {|e| listing.update("#{e}": listing_params[e])}
        else
            update_keys_array.each {|e| listing.update("#{e}": listing_params[e])}
        end
    end

    def return_json(listing)
        if listing.errors.size == 0
            render json: ListingSerializer.new(listing)
        else
            render json: {messages: listing.errors.full_messages}
        end
    end

    def update_all_columns(listing, update_keys_array)
        commodity = Commodity.find_by(name: listing_params[:commodity])
        listing.update(commodity_id: commodity.id)
        update_closed_column(listing)
        update_keys_array.slice(1..-2).each {|e| listing.update("#{e}": listing_params[e])}
    end
end
