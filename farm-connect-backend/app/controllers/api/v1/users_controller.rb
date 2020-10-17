class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user)
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

    private
    def user_params
        params.require(:user).permit(:type, :firstName, :lastName, :dateOfBirth, :state, :email, :password)
    end
end
