class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def show
        user = User.find_by(id: params[:id])
        photo = rails_blob_path(user.photo) if user.photo.attached?
        render json: { user: UserSerializer.new(user), photo: photo }
    end

    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    def create
        @user = User.new(first_name: user_params[:firstName], last_name: user_params[:lastName], date_of_birth: user_params[:dateOfBirth], email: user_params[:email], password: user_params[:password], type: user_params[:type])
        if @user.save
            @token = encode_token({user_id: @user.id})
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
            render json: { messages: @user.errors.full_messages.join(" ")}, status: :not_acceptable
        end
    end

    def update
        connect = Connection.find_by(user_id: params[:id], connect_id: params[:connectId]) || Connection.find_by(user_id: params[:connectId], connect_id: params[:id])
        user = User.find_by(id: params[:id])

        if !params.keys.include?("connectId")
            update_user_profile(user)
            render json: UserSerializer.new(user)
        elsif connect
            connect.destroy
            render json: UserSerializer.new(user)
        else
            user.connections.create(connect_id: params[:connectId])
            render json: UserSerializer.new(user)
        end
    end

    private
    def user_params
        params.require(:user).permit(:type, :firstName, :lastName, :dateOfBirth, :state, :email, :password)
    end

    def update_user_profile(user)
        user.update(first_name: user_params[:firstName]) if user_params[:firstName].present?
        user.update(last_name: user_params[:lastName]) if user_params[:lastName].present?
        user.update(date_of_birth: user_params[:dateOfBirth]) if user_params[:dateOfBirth].present?
        user.update(email: user_params[:email]) if user_params[:email].present?
    end
end
