Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :families
      resources :family_members
      resources :responses
      get 'settings/family', to: 'settings#family'
      delete 'settings/reset_survey', to: 'settings#reset_family_survey'
    end
  end

  get 'families/index'
  devise_for :families,
    controllers: {
      sessions: 'families/sessions',
      registrations: 'families/registrations'
    }
end
