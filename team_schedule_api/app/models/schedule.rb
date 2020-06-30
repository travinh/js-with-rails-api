class Schedule < ApplicationRecord
    belongs_to :user
    validates :title, uniqueness: true, presence: true
   
end
