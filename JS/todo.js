const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoReset = document.querySelector(".js-toDoReset"),
    toDoComplete = document.querySelector(".js-completeList");

const COMTODOS = "comtodos";
const TODOS = "todos";

let todos = [];
let comtodo =[];

/* BUTTON */

function handleDelBtn(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id)
    });
    todos = cleanToDo;
    saveToDo();
}

function handleComBtn(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const comToDos = todos.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    const cleanToDo = todos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
   const currentValue = comToDos[0].text;
   const currentId = comToDos[0].id;
   paintToDoCom(currentValue,currentId);
   todos = cleanToDo;
   saveToDoCom();
   saveToDo();
}


function comDeleteBtn(event){
    const btn = event.target;
    const li = btn.parentNode;
    console.log(li);
    toDoComplete.removeChild(li);
    const cleanToDo = comtodo.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    comtodo = cleanToDo;
    saveToDoCom();
}

function retrunBtn(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoComplete.removeChild(li);
    const returnToDo = comtodo.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    const cleanToDo = comtodo.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    const returnText = returnToDo[0].text;
    paintToDo(returnText);
    comtodo = cleanToDo;
    saveToDoCom();
}

function handleSubmitTo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(currentValue);
}

function handleReset() {
    localStorage.removeItem(TODOS);
    localStorage.removeItem(COMTODOS);
    location.reload();
}

/* PAINT */

function paintToDoCom(text, id) {
    const reBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const li = document.createElement("li");
    delBtn.addEventListener("click", comDeleteBtn);
    reBtn.addEventListener("click", retrunBtn);
    delBtn.innerText = `❌`;
    reBtn.innerText = `↩`;
    span.innerText = text;
    toDoComplete.appendChild(li);
    li.appendChild(reBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = id;
    reBtn.classList.add("returnBtn");
    delBtn.classList.add("deleteBtn");
    const comObj = {
        id:id,
        text:text
    };
    comtodo.push(comObj);
    saveToDoCom();
}

function paintToDo(text) {
    const delBtn = document.createElement("button");
    const comBtn = document.createElement("button");
    const span = document.createElement("span");
    const li = document.createElement("li");
    const newId = todos.length + 1;
    delBtn.addEventListener("click", handleDelBtn);
    comBtn.addEventListener("click", handleComBtn);
    delBtn.innerText = `❌`;
    comBtn.innerText = `✔`;
    span.innerText = text;
    toDoList.appendChild(li);
    li.appendChild(comBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    comBtn.classList.add("completeBtn");
    delBtn.classList.add("deleteBtn");
    const toDoObj = {
        id : newId,
        text : text 
    };
    todos.push(toDoObj);
    saveToDo();
}

/* SAVE */
function saveToDo() {
    localStorage.setItem(TODOS,JSON.stringify(todos));
}

function saveToDoCom() {
    localStorage.setItem(COMTODOS,JSON.stringify(comtodo));
}

/* LOAD */

function loadToDo() {
    const loadedToDo = localStorage.getItem(TODOS);
    const loadedCom = localStorage.getItem(COMTODOS);
    if(loadedToDo !== null){
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach(function(todo) {
            paintToDo(todo.text);
        })
    }
    if(loadedCom !== null){
        const parsedToDo = JSON.parse(loadedCom);
        parsedToDo.forEach(function(todo) {
            paintToDoCom(todo.text,todo.id);
        })
    }
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmitTo);
    toDoReset.addEventListener("click", handleReset);
  
}

init();