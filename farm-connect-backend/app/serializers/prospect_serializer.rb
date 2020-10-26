class ProspectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :email, :created_at
end
