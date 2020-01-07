let add = document.getElementById("add")
let todo = document.getElementById("to-do")
let todoList = document.getElementById("to-do-list")
let todoArr = []

window.onload = displayTodos()

add.addEventListener("click", (e) => {
    e.preventDefault()
    if(!isEmpty(todo)){
        if(todo.value.length <= 25){
            let addListItem = `<li><span>${todo.value}</span><div><button onclick='del(this)'>Delete</button>
            <button onclick='edit(this)'>Edit</button></div></li>`
            todoList.insertAdjacentHTML("beforeend", addListItem)
            //Store data in Local Storage as JSON -|-> array
            todoArr.push(todo.value)
            localStorage.setItem("todos", JSON.stringify(todoArr)) 
            todo.focus()
            todo.value=''
        } else{
            alert("To-do shouldn't be longer than 25 characters.")
        }
    }
}) 

function del(x){
    let deleteElement = x.parentElement.parentElement.firstChild
    todoArr = getStoredData()
    todoArr = todoArr.filter(ele => {return ele != deleteElement.innerText})
    localStorage.setItem("todos", JSON.stringify(todoArr)) //update local storage
    x.parentElement.parentElement.remove() //removes <li></li> 
}

function edit(x){
    let editElement = x.parentElement.parentElement.firstChild
    let editedTodo = prompt("Edit:", editElement.innerText)
    if(editedTodo.length <= 25){
        todoArr = getStoredData()
        todoArr = todoArr.filter(ele => {return ele != editElement.innerText})
        todoArr.push(editedTodo)
        editElement.innerText = editedTodo 
        localStorage.setItem("todos", JSON.stringify(todoArr))
    } else{
        alert("To-do shouldn't be longer than 25 characters.")
    }
}

function isEmpty(x){
    return x.value.trim() == '' || x.value == null
}

function displayTodos(){
    let todoStored = getStoredData()
    if(todoStored != null){
        for(let i = 0; i < todoStored.length; i++){
            let addListItem = `<li><span>${todoStored[i]}</span><div><button onclick='del(this)'>Delete</button>
            <button onclick='edit(this)'>Edit</button></div></li>`
            todoList.insertAdjacentHTML("beforeend", addListItem)
        }
    }
}

function getStoredData(){
    return JSON.parse(localStorage.getItem("todos"))
}