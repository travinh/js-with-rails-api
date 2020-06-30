class Schedule{

    static all= []

    constructor({id,title,content,num_member,user_id}){
        this.id = id
        this.title = title
        this.content = content
        this.num_member = num_member
        this.user_id = user_id
        Schedule.all.push(this)
    }

    htmlifySchedule(){
        return(`
        <div class="card"  >
            <div class="card-content" id=${this.id}>
              <span class="card-title">${this.title}</span>
              <p><span class="userId">Create by user ${this.user_id}</span></p>
              <p><span class="content">${this.content}</span></p>
              <p class="num_member">${this.num_member}</p>
              <button class="plus">+</button>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
    
            </div>
            
        </div>
        `
        )
    }

    renderSchedule(){
        scheduleList.innerHTML += this.htmlifySchedule()
    
    
    }




    
    

    static renderSchedules(){
        scheduleList.innerHTML = ""
        // Schedule.all.forEach(schedule => schedule.renderSchedule())
  
        Schedule.all.forEach(function(schedule){
          
            if (schedule["num_member"] >= 5)
                schedule.renderSchedule()

        })
        addMemberFeature()
    }

    static loadSchedules(){

        //send request, then create all schedules from data
        API.get()
        .then(schedules => {
            schedules.forEach(schedule => new Schedule(schedule))
 
            Schedule.all.sort((a, b) => b.num_member - a.num_member);
            Schedule.renderSchedules()
        })


       
      
    }

   
    



}

