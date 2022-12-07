module Api::V1
  class FamiliesController::FamilySerializer < ActiveModel::Serializer
    attributes :id, :email, :number_of_family_member, :postal_code, :first_name, :address, :city,
               :state, :country, :jti
    has_many :family_members
  end
end