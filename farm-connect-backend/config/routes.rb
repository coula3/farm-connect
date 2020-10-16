Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: "auth#create"
      resources :users
      resources :farmers
      resources :prospects
      resources :connects
    end
  end
end
