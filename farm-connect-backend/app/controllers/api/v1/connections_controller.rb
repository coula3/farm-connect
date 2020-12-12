class Api::V1::ConnectionsController < ApplicationController
    def index
        user = User.find_by(id: params[:id])
        consolidated_connections = user.connections << user.inverse_connections
        user_connections = consolidated_connections.map { |connect| [connect, User.find(connect.connect_id).type] }

        render json: { data: user_connections }
    end
end
