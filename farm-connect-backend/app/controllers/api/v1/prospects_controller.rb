class Api::V1::ProspectsController < ApplicationController
    def show
        prospect = Prospect.find_by(id: params[:id])
        render json: ProspectSerializer.new(prospect)
    end

    def index
        prospects = Prospect.all
        render json: ProspectSerializer.new(prospects)
    end
end
