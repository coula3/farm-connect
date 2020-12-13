class Api::V1::ConnectionsController < ApplicationController
    def index
        user = User.find_by(id: params[:id])
        user_connections(user)
    end

    def update
        connect = Connection.find_by(user_id: params[:id], connect_id: params[:connectId]) || Connection.find_by(user_id: params[:connectId], connect_id: params[:id])
        user = User.find_by(id: params[:id])

        if connect && params[:type]
            connect.update(status: "accepted")
        elsif connect
            connect.destroy
        else
            user.connections.create(connect_id: params[:connectId], status: "pending")
        end
        user_connections(user)
    end

    private
    def user_connections(user)
        user_connections = user.connections.to_a.map { |connect| [connect, User.find(connect.connect_id).first_name, User.find(connect.connect_id).last_name, User.find(connect.connect_id).type] }
        user_inverse_connections = user.inverse_connections.to_a.map { |connect| [connect, User.find(connect.user_id).first_name, User.find(connect.user_id).last_name, User.find(connect.user_id).type] }
        consolidated_connections = user_connections.union(user_inverse_connections)

        render json: { data: consolidated_connections }
    end
end
