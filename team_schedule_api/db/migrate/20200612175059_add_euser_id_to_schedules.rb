class AddEuserIdToSchedules < ActiveRecord::Migration[6.0]
  def change
    add_column :schedules, :user_id, :integer, foreign_key: true
  end
end
