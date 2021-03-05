const weather = document.querySelector(".js-weather");

const API_KEY = `a24bd7e8639c483064d4ac3e308bdd63`;
const COORDS = "coords";

function loadWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json()
    }).then(function(json) {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

function handleGeoSuccess(event) {
    const latitude = event.coords.latitude;
    const longitude = event.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoFail() {
    console.log(`Fail`);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}

function getCoords() {
    const currentCoords = localStorage.getItem(COORDS);
    if(currentCoords === null) {
        askForCoords();
    }else {
        const parseCoords = JSON.parse(currentCoords);
        loadWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    getCoords();
}

init();