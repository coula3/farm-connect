class Api::V1::ProspectsController < ApplicationController
    def index
        prospects = Prospect.all
        render json: ProspectSerializer.new(prospects)
    end
end
