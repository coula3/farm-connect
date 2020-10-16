Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :farmers
      resources :prospects
      resources :connects
    end
  end
end
