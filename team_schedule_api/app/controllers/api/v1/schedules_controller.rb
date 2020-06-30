class Api::V1::SchedulesController < ApplicationController
    before_action :find_schedule, only:[:show, :update, :destroy,:create]

    def index
        @schedules = Schedule.all
        render json: @schedules
    end 
     
    def show
        render json: @schedule
    end 
    
    def create

        @schedule = Schedule.new(schedule_params)
        
        if @schedule.save
            render json: @schedule
        else
           
            render json:{errors: @schedule.errors.full_messages}
        end
    end 
    
    def update
  
    
        id = Schedule.find_by(title: params[:schedule][:title])[:user_id]
        id2 = params[:schedule][:user_id]
        if (id == id2)
            if @schedule.update(schedule_params) 
                render json: @schedule
            else
                render json:{errors: @schedule.errors.full_messages}
            end
        else
            render json:{errors: "You are not allowed to edit this schedule"}
        end
    end
   
    def destroy
        
        id = params[:user_id]
        id2 = Schedule.find_by_id(params[:id].to_i)[:user_id]
        
        if (id == id2)
            @schedule.destroy
            render json: @schedule
        else
            render json:{errors: "You are not allowed to delete this schedule"}
        end
    end 



    private
    def find_schedule
        @schedule =  Schedule.find_by(id:params[:id])
        
    end

    def schedule_params
        params.require(:schedule).permit(:title, :content, :id, :num_member, :user_id)
    end
    
end
