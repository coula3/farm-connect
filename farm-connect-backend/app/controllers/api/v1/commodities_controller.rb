class Api::V1::CommoditiesController < ApplicationController
    def index
        commodities = Commodity.all
        render json: CommoditySerializer.new(commodities)
    end
end
