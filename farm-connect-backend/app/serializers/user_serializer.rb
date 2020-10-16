class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :date_of_birth, :state, :email
end
