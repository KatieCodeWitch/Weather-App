 let apiKey = "0266533ac4e8b61c19419a959a2b8aae";
 let units = "metric";

function showWeather(response){
document.querySelector("#city-result").innerHTML = response.data.name;
document.querySelector("#temperature-now").innerHTML = Math.round(response.data.main.temp) ;
document.querySelector("#weather-descriptor").innerHTML = response.data.weather[0].description;
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
document.querySelector("#icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png` )

let currentHigh = Math.round(response.data.main.temp_max);
let rangeElement = document.querySelector("#current-hilow");
let currentLow = Math.round(response.data.main.temp_min);
rangeElement.innerHTML = `High ${currentHigh}° | Low ${currentLow}°`;
}

function search(city) {
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather); 
}

function handleSubmit(event) {
    debugger;
    event.preventDefault();
let city = document.querySelector("#city-input").value;
search(city);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

search("New York City");

function showCurrentPosition(position){
let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather); 
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentButton = document.querySelector(".btn-secondary");
currentButton.addEventListener("click", getCurrentPosition);



function formatDate(date){
let hours = date.getHours();
if (hours < 10 ) { 
    hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let dayIndex = date.getDay();
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayIndex];

let monthIndex = date.getMonth();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[monthIndex];

let todayDate = date.getDate();

return `${day}, ${month} ${todayDate}</br>${hours}:${minutes} ET`;
}


let dateElement = document.querySelector("#today-date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);






