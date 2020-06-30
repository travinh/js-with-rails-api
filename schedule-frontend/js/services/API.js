class API{
    static baseUrl = "http://localhost:3000/api/v1/schedules"
    
    static options = {
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }


    static get(){
        return(
            fetch(baseUrl)
            .then(resp => resp.json())
           
        )
        
    }
    static post(data){
      

        const options={
            ...API.options,
            method: 'POST',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
    
        }

        fetch(API.baseUrl,options)
        .then(resp => resp.json())
        .then((data) =>{
        
            if (!data.errors){
                
                //add new schedule to schedule List by creating it
                new Schedule(data)
                //display schedules
                Schedule.renderSchedules()
                clearForm()
            }
            else{
                throw new Error( `${data.errors}`)
            }
                        
        })
        .catch(alert)
    }

    static delete(Id, data){
   
        const options ={
            ...API.options,
            method: 'DELETE',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
    
        }
        const url = API.baseUrl + `/${Id}`
        
        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                const index = Schedule.all.findIndex((schedule)=> schedule.id === data.id)
                //splice remove item in schedule
                Schedule.all.splice(index,1)
                Schedule.renderSchedules()
               
            }else{
                throw new Error( `${data.errors}` )
            } 
        })
        .catch(alert)
    }

    static patch(data, Id){
        const options ={
            ...API.options,
            method: 'PATCH',
            body: JSON.stringify({schedule:data})
        }
        const url = API.baseUrl + `/${Id}`
        
        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                // create a new schedule
                // debugger
                const editSchedules  = Schedule.all.map(schedule =>{
                    if(schedule.id === data.id){
                        return new Schedule(data)
                    }else{
                        return schedule
                    }
                })
                Schedule.all = editSchedules
                Schedule.renderSchedules()
                clearForm()
            }else{
                throw new Error( `${data.errors}` )
            } 
            
        })
        .catch(alert)
    }


    
}