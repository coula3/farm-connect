class Api::V1::UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user)
    end

    def index
        users = User.all
        render json: UserSerializer.new(users)
    end
end
