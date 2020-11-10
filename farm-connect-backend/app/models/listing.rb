class Listing < ApplicationRecord
  belongs_to :user
  belongs_to :commodity
  has_many :interests

  validates :availability, presence: true
  validates :quantity, numericality: { greater_than: -1, allow_nil: true, message: "quantity must be a positive value" }
  validates :information, length: { maximum: 255 }
  validate :past_availability
  validate :require_measure

  def past_availability
    if availability_changed? && availability.present? && availability < Date.today
        errors.add(:availability, "cannot be in the past")
    end
  end

  def require_measure
    if quantity && quantity > -1 && !measure.present?
      errors.add(:measure, "can't be blank")
    end
  end
end
