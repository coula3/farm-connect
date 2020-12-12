Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signin', to: "auth#create"
      resources :users
      resources :farmers
      resources :prospects
      resources :connects
      resources :listings
      resources :commodities
      resources :prospects
      resources :interests
      resources :photos
      resources :connections
    end
  end
end
