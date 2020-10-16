class Prospect < User
    has_many :connects
    has_many :farmers, through: :connects
end
