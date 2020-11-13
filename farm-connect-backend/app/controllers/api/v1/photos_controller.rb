class Api::V1::PhotosController < ApplicationController
    def update
        user = User.find_by(id: params[:id])
        if params[:file]
            user.photo.attach(params[:file])
            @photo = rails_blob_path(user.photo)
            render json: { user: UserSerializer.new(user), photo: @photo }
        end
    end
end
