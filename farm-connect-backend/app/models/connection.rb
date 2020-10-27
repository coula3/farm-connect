class Connection < ApplicationRecord
    belongs_to :user
    belongs_to :connect, class_name: :User
end
