class Api::V1::PhotosController < ApplicationController
    def update
        user = User.find_by(id: params[:id])
        if params[:file]
            user.photo.attach(params[:file])
            @photo = rails_blob_path(user.photo)
            user.update(photo: @photo)
            render json: user
        end
    end
end
