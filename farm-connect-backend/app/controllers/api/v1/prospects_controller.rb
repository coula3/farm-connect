class Api::V1::ProspectsController < ApplicationController
    def show
        prospect = Prospect.find_by(id: params[:id])

        if prospect
            @image = rails_blob_path(prospect.photo) if prospect.photo.attached?
            prospect.image = @image
            render json: { prospect: ProspectSerializer.new(prospect) }
        else
            render json: { message: "Prospect does not exist" }, status: :not_acceptable
        end
    end

    def index
        suggested_prospects_ids
        suggested_prospects = suggested_prospects_ids.map {|id| Prospect.find(id)}

        prospects_with_images = suggested_prospects.map do |prospect|
            @image = prospect.photo.attached? ? rails_blob_path(prospect.photo) : ""
            prospect.image = @image
            prospect
        end

        render json: ProspectSerializer.new(prospects_with_images)
    end

    private
    def suggested_prospects_ids
        prospects_ids = Prospect.where.not(id: params[:id]).map(&:id)
        current_user = User.find_by(id: params[:id])

        connects = current_user.connects.map(&:id)
        inverse_connects = current_user.inverse_connects.map(&:id)
        consolidated_connects = connects.dup.concat(inverse_connects)

        suggested_prospects = prospects_ids.reject {|prospect| consolidated_connects.include?(prospect)}.shuffle.sample(5)
    end
end