let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#currentTime");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector(
    "#searchedCity"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#tempL").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#tempH").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(city) {
  let apiKey = "d472df3cc457416a11c7918c00d8eaa1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", changeCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d472df3cc457416a11c7918c00d8eaa1";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#locationButton");
button.addEventListener("click", getCurrentPosition);

function showCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

search("Stockholm");
