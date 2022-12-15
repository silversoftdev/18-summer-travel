class ResponseChoice < ApplicationRecord
  belongs_to :choices, optional: true
  belongs_to :family_member

  after_create :family_member_status

  private

  def family_member_status
    family_member.update(survey_status: 1) if family_member.response_choices.count < 2
    if family_member.age < 14
      family_member.update(survey_status: 2) if family_member.response_choices.select(:question_id).distinct.count == Question.count - 12
    else
      family_member.update(survey_status: 2) if family_member.response_choices.select(:question_id).distinct.count == Question.count
    end
  end
end
