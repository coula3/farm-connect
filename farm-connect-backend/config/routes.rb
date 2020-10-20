Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signin', to: "auth#create"
      resources :users
      resources :farmers
      resources :prospects
      resources :connects
      resources :listings
    end
  end
end
