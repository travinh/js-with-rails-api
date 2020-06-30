Rails.application.routes.draw do
  root to: 'application#welcome'
  # get '/', to: "sessions#welcome"

  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/login'
  # get 'sessions/welcome'
  # get 'users/new'
  # get 'users/create'

  # resources :users, only: [:new, :create]
  # get 'login', to: 'sessions#new'
  # post 'login', to: 'sessions#create'
  # get 'welcome', to: 'sessions#welcome'
  


  namespace :api do 
    namespace :v1 do 
      resources :schedules
      resources :users
    end 
  end

  



  # root to: "application#welcome"

  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
