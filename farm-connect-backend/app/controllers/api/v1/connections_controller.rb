class Api::V1::ConnectionsController < ApplicationController
    def index
        user = User.find_by(id: params[:id])
        consolidated_connections = user.connections << user.inverse_connections
        user_connections = consolidated_connections.map { |connect| [connect, User.find(connect.connect_id).type] }

        render json: { data: user_connections }
    end

    def update
        connect = Connection.find_by(user_id: params[:id], connect_id: params[:connectId]) || Connection.find_by(user_id: params[:connectId], connect_id: params[:id])
        user = User.find_by(id: params[:id])

        if connect && params[:type]
            connect.update(status: "accepted")
        elsif connect
            connect.destroy
            render json: { user: UserSerializer.new(user) }
        else
            user.connections.create(connect_id: params[:connectId], status: "pending")
            render json: { user: UserSerializer.new(user) }
        end
    end
end
