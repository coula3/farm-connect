class User < ApplicationRecord
    has_many :connections
    has_many :connects, through: :connections
    has_many :interests
    has_many :listings
    validates :type, :first_name, :last_name, :date_of_birth, presence: true
    validates :email, uniqueness: { case_sensitive: false }
    has_secure_password
end
