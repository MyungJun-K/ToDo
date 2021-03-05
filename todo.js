const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoReset = document.querySelector(".js-toDoReset");

const TODOS = "todos"
let todos = [];

function handleDelBtn(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id)
    });
    todos = cleanToDo;
    saveName();
}

function handleCheck(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const checkStatus = event.target.checked;
    if(checkStatus){
        li.classList.add("toDoComplete");
    } else {
        li.classList.remove("toDoComplete");
    }
}

function paintToDo(text) {
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const li = document.createElement("li");
    const check = document.createElement("input");
    const newId = todos.length + 1;
    delBtn.addEventListener("click", handleDelBtn);
    delBtn.innerText = `❌`;
    span.innerText = text;
    check.addEventListener("click", handleCheck);
    check.type = "checkbox";
    toDoList.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(check);
    li.appendChild(span);
    li.id = newId;
    const toDoObj = {
        id : newId,
        text : text 
    };
    todos.push(toDoObj);
    saveName()
}

function saveName() {
    localStorage.setItem(TODOS,JSON.stringify(todos));
}

function handleSubmitTo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(currentValue);
}

function loadToDo() {
    const loadedToDo = localStorage.getItem(TODOS);
    if(loadedToDo !== null){
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach(function(todo) {
            paintToDo(todo.text);
        })
    }
}

function handleReset() {
    localStorage.removeItem(TODOS);
    location.reload();
}

function resetBtn(){
     toDoReset.addEventListener("click", handleReset);
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmitTo);
    resetBtn();
  
}

init();