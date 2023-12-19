document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "2927b4743fce841c29656af226a1a8c9"; // API key
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast.json?";

  // DOM elements
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const historyList = document.getElementById("history");
  const todaySection = document.getElementById("today");
  const forecastSection = document.getElementById("forecast");
  const clearHistoryButton = document.getElementById("clear-history");

  // Load search history from localStorage
  loadSearchHistory();

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

  // Event listener for clear history button
  clearHistoryButton.addEventListener("click", function () {
    clearSearchHistory();
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
            <h2>${data.city.name} (${dayjs(currentWeather.dt_txt).format("D MMMM, YYYY")})<img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather Icon"></h2>
            <p>Temperature: ${currentWeather.main.temp}°C</p>
            <p>Wind Speed: ${currentWeather.wind.speed} KPH</p>
            <p>Humidity: ${currentWeather.main.humidity}%</p>
          `;
    todaySection.innerHTML = todayHtml;

    // 5 day forecast
    for (let i = 2; i < data.list.length; i += 8) {
      const forecastWeather = data.list[i];
      const forecastHtml = `
              <div class="col-md-2">
                <h4>${dayjs(forecastWeather.dt_txt).format("D MMM YYYY")}</h4>
                <p>Temp: ${forecastWeather.main.temp}°C</p>
                <p>Wind: ${forecastWeather.wind.speed} KPH</p>
                <p>Humidity: ${forecastWeather.main.humidity}%</p>
                <img src="https://openweathermap.org/img/wn/${forecastWeather.weather[0].icon}.png" alt="Weather Icon">
              </div>
            `;
      forecastSection.innerHTML += forecastHtml;
    }
  }

  // Function to add city to search history
  function addToHistory(cityName) {
    // Load search history from localStorage
    const historyArray = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Check for duplicates
    if (!historyArray.includes(cityName)) {
      // Add city to history array
      historyArray.push(cityName);
      localStorage.setItem('weatherHistory', JSON.stringify(historyArray));

      // Render the updated history
      loadSearchHistory();
    }
  }

  // Function to load search history from localStorage
  function loadSearchHistory() {
    // Load search history from localStorage
    const historyArray = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Clear the existing history list
    historyList.innerHTML = "";

    // Render each city in the history
    historyArray.forEach((cityName) => {
      const historyItem = document.createElement("button");
      historyItem.classList.add("list-group-item", "list-group-item-action", "history-item");
      historyItem.setAttribute("data-city", cityName);
      historyItem.textContent = cityName;
      historyList.appendChild(historyItem);
    });
  }

    // Function to load search history from localStorage
    function loadSearchHistory() {
      // Load search history from localStorage
      const historyArray = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  
      // Clear the existing history list
      historyList.innerHTML = "";
  
      // Render each city in the history
      historyArray.forEach((cityName) => {
        const historyItem = document.createElement("button");
        historyItem.classList.add("list-group-item", "list-group-item-action", "history-item");
        historyItem.setAttribute("data-city", cityName);
        historyItem.textContent = cityName;
        historyList.appendChild(historyItem);
      });
  
      // Toggle the visibility of the "Clear History" button based on the historyArray length
      clearHistoryButton.style.display = historyArray.length ? "block" : "none";
    }
  
    // Function to clear search history
    function clearSearchHistory() {
      // Clear search history from localStorage
      localStorage.removeItem('weatherHistory');
  
      // Clear the existing history list
      historyList.innerHTML = "";
  
      // Hide the "Clear History" button
      clearHistoryButton.style.display = "none";
    }
  }
);
