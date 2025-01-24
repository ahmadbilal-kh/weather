const apiKey = "afb8437e054c11199f1cf26dda6fa8b9"; // Api key
const weatherInfo = document.getElementById("weather-info");
const cityInput = document.getElementById("city-input");
const checkWeatherButton = document.getElementById("check-weather");

// Function to fetch and display weather
const fetchWeather = async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${temperature}°C</p>
      <p>Condition: ${description}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
};

// Add event listener for the button click
checkWeatherButton.addEventListener("click", fetchWeather);

// Add event listener for the Enter key press in the input field
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});
