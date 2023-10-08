
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsetting = {
    databaseURL: "https://cart-2cc75-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appsetting)
const database = getDatabase(app)
const itemindb = ref(database, "itmes")

let Save = document.getElementById("save")
let Add = document.getElementById("add")
let Input = document.getElementById("input")

onValue(itemindb, function (sanpshot) {
    if(sanpshot.exists()){
        let itemarr = Object.entries(sanpshot.val())
        clearlist()
        for (let i = 0; i < itemarr.length; i++) {
        let currentitem = itemarr[i]
        let currentitemid = currentitem[0]
        let currentitemvalue = currentitem[1]
        render(currentitem)
        }
    }
    else{
        Save.innerHTML="NO ITEMS AVAILABLE"
    }

    
})

Add.addEventListener("click", function () {
    let inputvalue = Input.value
    push(itemindb, inputvalue)
    clear()
})
function clearlist() {
    Save.innerHTML = " "

}
function clear() {
    Input.value = " "
}
function render(value) {
    let itemid = value[0]
    let itemvalue = value[1]
    let newel = document.createElement("li")
    newel.textContent = itemvalue
    Save.append(newel)
    newel.addEventListener("click", function () {
        console.log(itemid)
        let address = ref(database, `itmes/${itemid}`)
        console.log(address)
        remove(address)
    })
}
