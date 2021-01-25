class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def show
        user = User.find_by(id: params[:id])
        if user
            photo = rails_blob_path(user.photo) if user.photo.attached?
            render json: { user: UserSerializer.new(user), photo: photo }
        else
            render json: { message: "User does not exit" }, status: :not_acceptable
        end
    end

    def index
        users = User.arel_table
        if params[:type] == "F"
            users_by_first_name = User.where(users[:first_name].matches("%#{params[:q]}%")).where(type: "Farmer")
            users_by_last_name = User.where(users[:last_name].matches("%#{params[:q]}%")).where(type: "Farmer")
        else
            users_by_first_name = User.where(users[:first_name].matches("%#{params[:q]}%")).where(type: "Prospect")
            users_by_last_name = User.where(users[:last_name].matches("%#{params[:q]}%")).where(type: "Prospect")
        end

        @users = users_by_first_name.to_a.concat(users_by_last_name).uniq
        render json: { users: UserSerializer.new(@users) }
    end

    def create
        @user = User.new(first_name: user_params[:firstName], last_name: user_params[:lastName], date_of_birth: user_params[:dateOfBirth], email: user_params[:email].downcase, password: user_params[:password], type: user_params[:type])
        if @user.save
            @token = encode_token({user_id: @user.id})
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
            render json: { messages: @user.errors.full_messages}, status: :not_acceptable
        end
    end

    def update
        user = User.find_by(id: params[:id])

        update_user_profile(user)
        if user.save
            render json: { user: UserSerializer.new(user) }
        else
            render json: {messages: user.errors.full_messages}
        end
    end

    private
    def user_params
        params.require(:user).permit(:type, :firstName, :lastName, :dateOfBirth, :state, :email, :password)
    end

    def update_user_profile(user)
        user.first_name = user_params[:firstName]
        user.last_name = user_params[:lastName]
        user.date_of_birth = user_params[:dateOfBirth]
        user.email = user_params[:email].downcase
        user
    end
end
