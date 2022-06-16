Rails.application.routes.draw do
  devise_for :users

  root "hangouts#index"
  get "hangouts/index"

  resources :messages, only: [:create]
end
