import {initializeApp}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings={
    databaseURL:"https://edwin-85bb6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app= initializeApp(appSettings)
const database= getDatabase(app)
const itemsIndb= ref(database,"items") 

const addBtn =document.getElementById("add-btn")
const inputField =document.getElementById("input-field")
const itemsEl=document.getElementById("items-el")

addBtn.addEventListener("click", function(){
    let inputValue=inputField.value
    push(itemsIndb,inputValue)

     clearInputField()

})

onValue(itemsIndb, function(snapshot){
    if(snapshot.exists()){
        let itemsArray= Object.entries(snapshot.val())
        clearItemsEl()
        for(let i=0; i<itemsArray.length; i++){
            let currentItem= itemsArray[i]
            //let currentItemId= currentItem[0]
            //let currentItemValue= currentItem[1]
            appendItemsFromdb(currentItem)
        }

    }
    else{
        itemsEl.innerHTML="No item on the database yet...kindly add."
    }
})
function clearItemsEl(){
    itemsEl.innerHTML=""
}

function clearInputField(){
    inputField.value=""
}
function appendItemsFromdb(item){
    let itemId= item[0]
    let itemValue= item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemId= ref(database,`items/${itemId}`)
        remove(exactLocationOfItemId)
        console.log(itemId)
    })
    itemsEl.append(newEl)    
}
