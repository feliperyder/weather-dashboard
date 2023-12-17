// Variables for HTML Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history');
const todaySection = document.getElementById('today');
const forecastSection = document.getElementById('forecast');


 // queryURL is the url we'll use to query the API
 var queryURL = "https://api.openweathermap.org/data/2.5/forecast.json?";

 // Begin building an object to contain our API call's query parameters
 // Set the API key
 var queryParams = { "api-key": "2927b4743fce841c29656af226a1a8c9" };

// API Key
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={2927b4743fce841c29656af226a1a8c9}

// Event Listeners
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get city name from form
    const cityName = searchInput.value;
    // Validate
    if (cityName.trim() !== '') {
    // Call function
    fetchWeatherData(cityName);
    // Clear form
    earchInput.value = '';
}
});

// Function to perform a fetch from OpenWeather
    // Make request
    // Parse the JSON
    // Update UI

// Function to Update the UI with the weather information
    // Update the "today" section with; city name, date, weather icon, temperature, wind speed & humidity.
    function updateCurrentWeather(data) {
}
    // update the "forecast" section with 5-day forecast with; date, weather icon, temperature, wind speed & humidity.
    function updateForecast(data) {
    }

// Function to handle city click from the search history
    function handleCityClick(cityName) {
    }
    // Call the fetchWeatherData function with the selected city name


// Function to handle city click from search history

// Event listener? (OR GROUP AT TOP)

// Function to save search cities to localStorage
function saveToLocalStorage(cityName) {
}
    // Check if localStorage already has search history
        // If it does, render from localStorage 
        // If it doesn't make API call & save to localStorage & call createSearchButton function.
        
// function to createSearchButton
function addToHistory(cityName) {
    const historyItem = document.createElement("button");
    historyItem.classList.add("list-group-item", "list-group-item-action", "history-item");
    historyItem.setAttribute("data-city", cityName);
    historyItem.textContent = cityName;
    historyList.appendChild(historyItem);
}
// Function to load search history from localStorage
function loadSearchHistory()
    // Check if localStorage already has search history
        // If it does, render from localStorage
        // If it doesn't make API call & save to localStorage.

// Call loadSearchHistory