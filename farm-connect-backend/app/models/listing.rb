class Listing < ApplicationRecord
  belongs_to :user
  belongs_to :commodity
  has_many :interests

  validates :availability, presence: true
  validates :quantity, numericality: { greater_than: -1, allow_nil: true, message: "quantity must be a positive value" }
  validates :information, length: { maximum: 255 }
end
