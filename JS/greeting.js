const greetingForm = document.querySelector(".js-greetingForm"),
    greetingInput = greetingForm.querySelector("input"),
    nameGreeting = document.querySelector(".js-nameGreeting"),
    nameCg = document.querySelector(".js-nameCg");

const USER_LS = "currentUser";
const SHOW_CN = "showing";


function paintName(text) {
    greetingForm.classList.remove(SHOW_CN);
    nameGreeting.classList.add(SHOW_CN);
    nameGreeting.innerText = `Hello ${text}`
}

function handleSubmitName(event) {
    event.preventDefault();
    const user = greetingInput.value;
    saveName(user);
    greetingInput.value = "";
    paintName(user);
}

function saveName(user) {
    localStorage.setItem(USER_LS, user);
}

function askForName() {
    greetingForm.classList.add(SHOW_CN);
    greetingForm.addEventListener("submit", handleSubmitName);
}

function loadGreeting() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    }else {
        paintName(currentUser);
    }
}

function handleNameChange() {
    nameGreeting.classList.remove(SHOW_CN);
    localStorage.removeItem(USER_LS);
    loadGreeting();
}

function nameChange() {
    nameCg.addEventListener('click', handleNameChange)
}

function init() {
    loadGreeting();
    nameChange();
}

init();