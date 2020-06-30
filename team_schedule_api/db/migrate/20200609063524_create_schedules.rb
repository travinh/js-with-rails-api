class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.string :title
      t.string :content
      t.integer :num_member, default: 0

      t.timestamps
    end
  end
end
