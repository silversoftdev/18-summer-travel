module Api::V1
  class MemberPreferenceController::MemberPreferenceSerializer < ActiveModel::Serializer
    attributes :choice_type, :choice

    def choice_type
      return if object.preferenceable_type.nil?

      if object.preferenceable_type.eql?('Destination')
        "#{object.preferenceable_type}: #{object.preferenceable.country.name}"
      else
        object.preferenceable_type
      end
    end

    def choice
      object.preferenceable.label unless object.preferenceable_id.nil?
    end
  end
end