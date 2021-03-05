const clockTitle = document.querySelector(".js-clockTitle"),
    clock = document.querySelector(".js-clock"),
    clockGreeting = document.querySelector(".js-clockGreeting");

function timeGreeting() {
    const hours = getTime();
    if(hours < 12 && hours > 6) {
        clockGreeting.innerText = `Good Morning`;
    }else if(12 < hours && hours < 18) {
        clockGreeting.innerText = `Good Afternoon`;
    }else if(18 < hours && hours <=23) {
        clockGreeting.innerText = `Good Evening`;
    }else {
        clockGreeting.innerText = `Good Night`;
    }
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes }:${
        seconds < 10 ? `0${seconds}` : seconds}`;

    return hours;
}

function init() {
    getTime();
    setInterval(getTime);
    timeGreeting();
}

init();