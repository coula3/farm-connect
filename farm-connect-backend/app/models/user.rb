class User < ApplicationRecord
    has_one_attached :photo

    has_many :connections
    has_many :connects, through: :connections

    has_many :inverse_connections, class_name: :Connection, foreign_key: :connect_id
    has_many :inverse_connects, through: :inverse_connections, source: :user

    has_many :interests
    has_many :listings

    validates :type, :first_name, :last_name, :date_of_birth, presence: true
    validates :email, uniqueness: { case_sensitive: false }
    validate :dob_must_be_at_least_thirteen_years_old
    has_secure_password

    def dob_must_be_at_least_thirteen_years_old
        if date_of_birth.present? && calculate_age < 13
            errors.add(:date_of_birth, "must be least 13 years")
        end
    end

    def calculate_age
        Date.today < self.date_of_birth + (Date.today.year - self.date_of_birth.year).years ?  Date.today.year - self.date_of_birth.year - 1 : Date.today.year - self.date_of_birth.year
    end
end
