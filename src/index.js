function refreshWeather(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class= weather-app-icon" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = ` ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minute = `0${minutes}`;
  }

  return `${day} ${hours}: ${minutes}`;
}

function searchCity(city) {
  // goal is to make api call and update UI user interface
  let apiKey = "9117d16f27ad34748062df20bto34069";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  //seperation of concern  means it will only do a job that is assigned
  //ask axios to update data for new city
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);

  //next task call API
  //search for the city
}

function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "9117d16f27ad34748062df20bto34069";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
                <div class= "weather-forecast-date">${formatday(day.time)}</div>
                
                <img src="${
                  day.condition.icon_url
                }" class="weather-forecast-icon" />
                
                   <div class="weather-forecast-temperatures">
                    <div class =" weather-forecast-temperature">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>  
                </div>
                <div class= "weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}°</div>
             </div>
             </div>
             `;
    }
  });

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

//default when loading page city name and temperature now not hard coded into the html
displayForecast();
