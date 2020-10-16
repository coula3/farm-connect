class Farmer < User
    has_many :connects
    has_many :prospects, through: :connects
end
