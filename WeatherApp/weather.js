function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = //add the api key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const resultDiv = document.getElementById("weatherResult");
      if (data.cod === 200) {
        resultDiv.innerHTML = `
          <strong>📍 ${data.name}</strong><br>
          🌡 Temp: ${data.main.temp} °C<br>
          💧 Humidity: ${data.main.humidity}%<br>
          ☁️ Condition: ${data.weather[0].main}
        `;
      } else {
        resultDiv.textContent = "City not found.";
      }
    })
    .catch((err) => {
      document.getElementById("weatherResult").textContent =
        "Failed to fetch weather.";
      console.error(err);
    });
}
