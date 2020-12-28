//selectors
const task = document.querySelector(".todo-input");
const btn = document.querySelector(".add");
const list = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todo");

//event listener
//encountered error here case sensitive DOMContentloaded
document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener("click", addtodo);
list.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filtertodo);


//functions
function addtodo(event){

    //prevent form from submitting
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = task.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to do to local
    saveLocalTodos(task.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    list.appendChild(todoDiv);
    task.value="";
}

function deleteCheck(e){
    const item = e.target;
    e.preventDefault();
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
//check mark
    if(item.classList[0] === "complete-btn"){
    e.preventDefault();
    const done = item.parentElement;
    done.classList.toggle("completed");
 }
}

function filtertodo(e){
    const todos = list.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display ="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){

//check
let todos;
if (localStorage.getItem("todos") === null){
    //empty array
    todos = [];

}else{
    todos =JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos));
}

// clear storage 
// localStorage.clear();

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        //empty array
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
//todo div
const todoDiv = document.createElement('div');
todoDiv.classList.add("todo");
//create li
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
//check mark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//check trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//append to list
list.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        //empty array
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //value of LI?

    const todoIndex = (todo.children[0].innerText);
    //get the number in array of the specified value "zzzz"
    //array.splice(index, howmany, item1, ....., itemX)
    //1 is how many 
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}