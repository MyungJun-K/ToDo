const everyForm = document.querySelector(".js-everydayForm"),
    everyInput = everyForm.querySelector("input"),
    everydayToDo = document.querySelector(".js-everydayToDo"),
    everydayReset = document.querySelector(".js-everydayReset");

const EVERY = "every";
let everys = [];

function paintEvery(text) {
    const newId = everys.length + 1; 
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const li5 = document.createElement("li");
    const li6 = document.createElement("li");
    const li7 = document.createElement("li");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const input3 = document.createElement("input");
    const input4 = document.createElement("input");
    const input5 = document.createElement("input");
    const input6 = document.createElement("input");
    const input7 = document.createElement("input");
    const span = document.createElement("span")
    span.innerText = text;
    input1.type = "checkbox";
    input2.type = "checkbox";
    input3.type = "checkbox";
    input4.type = "checkbox";
    input5.type = "checkbox";
    input6.type = "checkbox";
    input7.type = "checkbox";
    everydayToDo.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(span);
    ul.appendChild(li1);
    li1.appendChild(input1);
    ul.appendChild(li2);
    li2.appendChild(input2);
    ul.appendChild(li3);
    li3.appendChild(input3);
    ul.appendChild(li4);
    li4.appendChild(input4);
    ul.appendChild(li5);
    li5.appendChild(input5);
    ul.appendChild(li6);
    li6.appendChild(input6);
    ul.appendChild(li7);
    li7.appendChild(input7);
    ul.id = newId;
    span.classList.add("todoMargin");
    const everyObj = {
        id : newId,
        text : text,
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7
     };
     everys.push(everyObj);
     saveEvery();
}

function saveEvery() {
    localStorage.setItem(EVERY, JSON.stringify(everys));
}

function handleEvery(event){
    event.preventDefault();
    const currentEvery = everyInput.value;
    everyInput.value = "";
    paintEvery(currentEvery);
}



function loadEvery() {
    const currentValue = localStorage.getItem(EVERY);
    if(currentValue !== null) {
        const parsedEvery = JSON.parse(currentValue);
        parsedEvery.forEach(function(every) {
            paintEvery(every.text);
        })
    }
}

function handleEveryReset() {
    localStorage.removeItem(EVERY);
   
}

function everyReset(){
    everydayReset.addEventListener("click", handleEveryReset);
}

function init() {
    loadEvery();
    everyForm.addEventListener("submit", handleEvery);
    everyReset();
}

init();