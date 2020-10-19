class Listing < ApplicationRecord
  belongs_to :user
  belongs_to :commodity
  has_many :interests
end
