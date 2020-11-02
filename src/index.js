 let apiKey = "0266533ac4e8b61c19419a959a2b8aae";
 let units = "metric";
 
function formatDate(timestamp){
  let date = new Date(timestamp);


let dayIndex = date.getDay();
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayIndex];
let monthIndex = date.getMonth();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[monthIndex];
let todayDate = date.getDate();
return `${day}, ${month} ${todayDate}</br>${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function showWeather(response){
document.querySelector("#city-result").innerHTML = response.data.name;
document.querySelector("#temperature-now").innerHTML = Math.round(response.data.main.temp) ;
document.querySelector("#weather-descriptor").innerHTML = response.data.weather[0].description;
document.querySelector("#current-high").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#current-low").innerHTML = Math.round(response.data.main.temp_min);

document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
document.querySelector("#icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png` )

celsiusTemp = response.data.main.temp;
celsiusTempHigh = response.data.main.temp_max;
celsiusTempLow = response.data.main.temp_min;

}

function showForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
     <div class="card">
        <div class="card-body">
      <h5 class = "card-title">
        ${formatHours(forecast.dt * 1000)}
      </h5>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong id = "forecast-high">
          ${Math.round(forecast.main.temp_max)}°
        </strong> | <span id = "forecast-low">
        ${Math.round(forecast.main.temp_min)}° 
        </span>
      </div>
    </div>
      </div>
    </div>
  `;
  }
}

function search(city) {
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather); 

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
    debugger;
    event.preventDefault();
let city = document.querySelector("#city-input").value;
search(city);
}

function showCurrentPosition(position){
let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather); 
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
}


let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector(".btn-secondary");
currentButton.addEventListener("click", getCurrentPosition);

let dateElement = document.querySelector("#today-date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);


function showFahrenheitTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-now");
    let currentHigh = document.querySelector("#current-high");
    let currentLow = document.querySelector("#current-low");
   
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    let fahrenheitHigh = (celsiusTempHigh * 9) / 5 + 32; 
    currentHigh.innerHTML = Math.round(fahrenheitHigh);
    let fahrenheitLow = (celsiusTempLow * 9) / 5 + 32; 
    currentLow.innerHTML = Math.round(fahrenheitLow);

        celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event){
    event.preventDefault();
   document.querySelector("#temperature-now").innerHTML = Math.round(celsiusTemp);
    document.querySelector("#current-high").innerHTML = Math.round(celsiusTempHigh);
    document.querySelector("#current-low").innerHTML = Math.round(celsiusTempLow);


    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#to-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#to-celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;


search("New York City");