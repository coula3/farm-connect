class Api::V1::ProspectsController < ApplicationController
    def show
        prospect = Prospect.find_by(id: params[:id])
        @image = rails_blob_path(prospect.photo) if prospect.photo.attached?
        prospect.image = @image

        render json: ProspectSerializer.new(prospect)
    end

    def index
        prospects = Prospect.all

        prospects_with_images = prospects.map do |prospect|
            @image = prospect.photo.attached? ? rails_blob_path(prospect.photo) : ""
            prospect.image = @image
            prospect
        end

        render json: ProspectSerializer.new(prospects_with_images)
    end
end