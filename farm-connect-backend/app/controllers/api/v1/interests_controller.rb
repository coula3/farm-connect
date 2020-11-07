class Api::V1::InterestsController < ApplicationController
    def index
        listing_interests_hash = Interest.group(:listing_id).count
        listing_interests_array = listing_interests_hash.sort_by {|k, v| v}.reverse.slice(0..4)
        listings_commodity_names = listing_interests_array.map {|listing| Listing.find(listing[0]).commodity.name}
        listing_interests = listing_interests_array.each.with_index {|element, idx| element.push(listings_commodity_names[idx])}
        # listing_interests = listing_interests_array.each.with_index {|element, idx| element.unshift(idx + 1).push(listings_commodity_names[idx])}

        render json: {interests: listing_interests}
    end
end
