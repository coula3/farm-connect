class Api::V1::InterestsController < ApplicationController
    def index
        open_listing_with_interests =  Interest.select {|interest| !interest.listing.closed }.pluck(:listing_id)

        listing_interests_hash = Hash.new(0)
        open_listing_with_interests.each {|e| listing_interests_hash[e] += 1}

        listing_interests_array = listing_interests_hash.sort_by {|k, v| v}.reverse.slice(0..4)
        listings_commodity_names = listing_interests_array.map {|listing| Listing.find(listing[0]).commodity.name}
        listing_interests = listing_interests_array.each.with_index {|element, idx| element.push(listings_commodity_names[idx])}

        render json: {interests: listing_interests}
    end
end
