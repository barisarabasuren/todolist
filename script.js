const form = document.querySelector("#input-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#list-ul");
const inputArea = document.querySelector("#input-area");
const listArea = document.querySelector("#list-area");
const filter = document.querySelector("#search-form");
const filterInput = document.querySelector("#todo-search-input");
const clearButton = document.querySelector("#clear-all-button");

eventListeners();

function eventListeners() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    listArea.addEventListener("click",deleteTodo);
    filter.addEventListener("submit",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos() {
    if(confirm("Are you sure you want to delete all?")) {
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstChild);
        }
        localStorage.removeItem("todos");
    }
}

function deleteTodo(e) {
    if (e.target.className === "fas fa-times") {
        e.target.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.textContent)
    }
}

function filterTodos(e) {
    const filterValue = filterInput.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group");
    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none")
        }
        else {
            listItem.setAttribute("style", "display: flex")
        }
    })
    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo,index){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        if (todo === deletetodo) {
            todos.splice(index,1);
        }

        localStorage.setItem("todos",JSON.stringify(todos));
    })
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(a){
        addTodoToUI(a);
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger","Please type a todo.");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo was added to your list");
    }

    e.preventDefault();
}

function getTodosFromStorage() {
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));


}

function showAlert(type,message) {
    const alert = document.createElement("div");
    alert.className = `${type}`;
    const symbolAlert = document.createElement("i");
    symbolAlert.className = "fas fa-skull-crossbones";
    alert.appendChild(symbolAlert);
    alert.appendChild(document.createTextNode(message))
    form.appendChild(alert);

    setTimeout(function(){
        alert.remove()
    },1500);
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    listItem.className = "list-group";
    listItem.appendChild(document.createTextNode(newTodo));
    const deleteItem = document.createElement("i");
    deleteItem.className = "fas fa-times";
    listItem.appendChild(deleteItem);
    todoList.appendChild(listItem);
    todoInput.value = "";
}
