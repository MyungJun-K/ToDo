const body = document.querySelector("body");
const color = document.querySelector(".js-mainContainer");

const IMG_CT = 5;

function genNumber() {
    const ranNum = Math.floor(Math.random() * IMG_CT);
    return ranNum
}

function paintBG(num) {
    const img = new Image();
    img.src = `images/${num + 1}.jpg`;
    img.classList.add("bgimg");
    body.appendChild(img);
    
}

function show() {
    const number = genNumber();
    paintBG(number);
}

function init() {
    show();
}

init();