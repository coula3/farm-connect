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
            render json: { messages: @user.errors.full_messages}, status: :not_acceptable
        end
    end

    def update
        connect = Connection.find_by(user_id: params[:id], connect_id: params[:connectId]) || Connection.find_by(user_id: params[:connectId], connect_id: params[:id])
        user = User.find_by(id: params[:id])

        if !params.keys.include?("connectId")
            if update_user_profile(user)
                render json: { user: UserSerializer.new(user) }
            else
                render json: {messages: user.errors.full_messages}
            end
        elsif connect
            connect.destroy
            render json: { user: UserSerializer.new(user) }
        else
            user.connections.create(connect_id: params[:connectId])
            render json: { user: UserSerializer.new(user) }
        end
    end

    private
    def user_params
        params.require(:user).permit(:type, :firstName, :lastName, :dateOfBirth, :state, :email, :password)
    end

    def update_user_profile(user)
        user.update(first_name: user_params[:firstName])
        user.update(last_name: user_params[:lastName])
        user.update(date_of_birth: user_params[:dateOfBirth])
        user.update(email: user_params[:email])
    end
end
