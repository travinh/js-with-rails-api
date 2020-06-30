document.addEventListener("DOMContentLoaded",function(){

   
    Schedule.loadSchedules() //load the pages with all schedules and form first
    mountFormListener() // then listen to the next step
    eventDelegation()
    
    
})

const formTitle = document.querySelector("#title")
const formContent = document.querySelector("#content")
const postForm = document.getElementById("schedule-form")
const baseUrl = "http://localhost:3000/api/v1/schedules"
const scheduleForm = document.getElementById("schedule-form")
const scheduleList = document.querySelector(".schedule-lists")


const formName =  document.querySelector("#name")
const userForm = document.getElementById("user-form")

// var current_user = {id: , name: nil}
var current_user = {"id": null, "name":null}
let userIdUpdate = 0




function addMemberFeature(){
    const addButtons = document.querySelectorAll(".plus")
    for (addButton of addButtons){
        addButton.addEventListener("click",getMember)
        
    }
}

async function getMember(e){
    
    if(current_user["id"] !=null)
    {
        
        const scheduleId = e.target.parentElement.id
        let num_member = parseInt(e.target.parentElement.querySelector(".num_member").innerText)
        num_member++
        let postObj = getScheduleData(e)

        const[title,,content] = e.target.parentElement.querySelectorAll("span")
        postObj["title"] = title.innerText
        postObj["content"] = content.innerText
        postObj["num_member"]= num_member
        
        

        // const postObj = {
        //     num_member
        // }
        
        API.patch(postObj,scheduleId)
    }
    
}





function eventDelegation(){
    const logout = document.querySelector(".logout")
    logout.addEventListener("click",function(e){
        current_user = {"id": null, "name":null}
        document.getElementById("userform1").style.display = "inherit"
        document.getElementById("logout").style.display = "none"
        
    
    })

    const sortList = document.querySelector(".sort")

    

    // sortList.addEventListener("click", function(e){
    //    if(e.target.className === "sortBtn")
    //    {

    //         Schedule.all.sort(dynamicSort("title"));
            
    //         Schedule.renderSchedules()

            
    // //         let c = []
    // //         b.forEach(function(item){
    // //             debugger
    // //             c.push(item["title"])
    // //         })
            
    // //         nums.sort(compare);
    // //    }

    //     }
    // })


    const scheduleList = document.querySelector(".schedule-lists")
    scheduleList.addEventListener("click",function(e){
        if (e.target.className === "edit" && current_user["id"] !=null){
            
            //grab the data from this card
            
            const[title,,content] = e.target.parentElement.querySelectorAll("span")
            // for (schedule of Schedule.all){
            //     if (schedule["title"]===title.innerText){
            //         userIdUpdate = schedule["user_id"]
            //     }
            // }
            //populate the form with values

            formTitle.value = title.innerText
            formContent.value = content.innerText
            postForm.dataset.id = e.target.parentElement.id
            
            //make change 
            document.querySelector(".btn").value = "Edit Schedule"
            postForm.dataset.action = "update"
            

            // change type of fetch sent

            //clean up - havr to change data action back to create
        
        }
        else if (e.target.className === "delete" && current_user["id"] !=null){
            const postObj = getScheduleData(e)
            const id = e.target.parentElement.id
            console.log("delete",id)
            API.delete(id,postObj)
            
        }   
    })

}

// function mountFormListenerUser(){
    
// }
function handlePost(event){
    // event.preventDefault()
    if (current_user["id"] != null)
        {      
            event.preventDefault()
                
                
                // grab the text from each field
                const postObj = getScheduleData(event)
                
                
                if (postForm.dataset.action === "create")
                {
                    API.post(postObj)
                    
                }
                else if (postForm.dataset.action === "update"){
                    const Id = event.target.dataset.id
        
                    API.patch(postObj, Id)
                    document.querySelector(".btn").value = "Create Post"
                    
                }
            
        }

}

function mountFormListener(){
 
    const postForm = document.getElementById("schedule-form")
    postForm.addEventListener("submit", handlePost)

        
        
            
    const userForm = document.getElementById("user-form")
    userForm.addEventListener("submit",function(event){
        
        event.preventDefault()
        const postObj = getUserData(event)
        
        fetch("http://localhost:3000/api/v1/users", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(postObj) // body data type must match "Content-Type" header
        })
        .then(resp => resp.json())
        .then((data) => {

            //remember current_user
            current_user = data
            document.getElementById("userform1").style.display = "none";
            if (document.getElementById("logout").style.display === "none") {
                document.getElementById("logout").style.display = "initial"
            }
            else {
                renderButton(htmlifyLogOut())
            }
            
                
        
        })
    })
}

const renderForm = (form) =>{
    const newForm = document.querySelector(".row")
    newForm.innerHTML += form
}

const renderButton = (form) =>{
    const newForm = document.querySelector(".logout")
    newForm.innerHTML += form
}


function getScheduleData(){
    return {
        title: formTitle.value,
        user_id: current_user["id"],
        content: formContent.value
    }  
}

// function getScheduleDataUpdate(){
//     return {
//         title: formTitle.value,
//         user_id: userIdUpdate,
//         content: formContent.value
//     }  
// }
function getUserData(){
    return {
        name: formName.value,
        
    }  
}

function clearForm (){
    formName.value = ""
    
}

function clearForm (){
    delete postForm.dataset.id
    postForm.dataset.action="create"
    formTitle.value = ""
    formContent.value = ""
    userIdUpdate = 0 

    
}


const htmlifyLogOut = function(){
    return(`
    <button class="log_out">Log Out</button>
    `)
}


