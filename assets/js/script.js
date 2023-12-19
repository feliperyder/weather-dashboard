document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "2927b4743fce841c29656af226a1a8c9"; // API key
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast.json?";

  // DOM elements
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const historyList = document.getElementById("history");
  const todaySection = document.getElementById("today");
  const forecastSection = document.getElementById("forecast");

  // Event listener for form submission
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = searchInput.value.trim();
    if (cityName !== '') {
      getWeatherData(cityName);
      searchInput.value = '';
    }
  });

  // Event listener for history item clicks
  historyList.addEventListener("click", function (event) {
    if (event.target.matches("button.history-item")) {
      const cityName = event.target.getAttribute("data-city");
      getWeatherData(cityName);
    }
  });

  // Function to perform a fetch from OpenWeather
  function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayWeatherData(data);
        addToHistory(cityName);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  // Function to display weather data
  function displayWeatherData(data) {
    todaySection.innerHTML = ""; // Clear content
    forecastSection.innerHTML = ""; // Clear content

    // Todays weather
    const currentWeather = data.list[0];
    const todayHtml = `
            <h2>${data.city.name}</h2>
            <p>Date: ${dayjs(currentWeather.dt_txt).format("D MMMM, YYYY")}</p>
            <p>Temperature: ${currentWeather.main.temp} K</p>
            <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
            <p>Humidity: ${currentWeather.main.humidity}%</p>
          `;
    todaySection.innerHTML = todayHtml;

    // 5 day forecast
    for (let i = 1; i < data.list.length; i += 8) {
      const forecastWeather = data.list[i];
      const forecastHtml = `
              <div class="col-md-2">
                <h4>${dayjs(forecastWeather.dt_txt).format("D MMM YYYY")}</h4>
                <p>Temperature: ${forecastWeather.main.temp} K</p>
                <p>Wind Speed: ${forecastWeather.wind.speed} m/s</p>
                <p>Humidity: ${forecastWeather.main.humidity}%</p>
              </div>
            `;
      forecastSection.innerHTML += forecastHtml;
    }
  }

  // Function to add city to search history
  function addToHistory(cityName) {
    const historyItem = document.createElement("button");
    historyItem.classList.add("list-group-item", "list-group-item-action", "history-item");
    historyItem.setAttribute("data-city", cityName);
    historyItem.textContent = cityName;
    historyList.appendChild(historyItem);
  }
});
