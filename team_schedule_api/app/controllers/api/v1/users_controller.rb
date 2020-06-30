class Api::V1::UsersController < ApplicationController
    before_action :find_user, only:[:show, :update, :destroy,:create]

   def index
        @users = User.all 
        render json: @users
   end

   def show 
        render json: @user
   end

   def create 
        @user = User.find_by(name: params[:name])
        if  !@user
            @user = User.new(user_params)
            if @user.save
                render json: @user
            else
                render json:{error: @user.errors.full_messages}
            end
        else
            render json: @user
        end

   end



    private
    def find_user
        @user =  User.find_by(id:params[:id])
    end

    def user_params
        params.require(:user).permit(:name, :id)
    end
    
end
