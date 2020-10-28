class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :type, :first_name, :last_name, :date_of_birth, :state, :email, :created_at, :listings, :interests, :connects, :inverse_connects
end
