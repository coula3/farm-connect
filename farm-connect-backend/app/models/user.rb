class User < ApplicationRecord
    validates :type, :first_name, :last_name, :date_of_birth, presence: true
    validates :email, uniqueness: { case_sensitive: false }
    has_secure_password
end
