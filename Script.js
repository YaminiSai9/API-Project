document.getElementById('getWeather').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '2d54fe143628e0eaf6881d4bebeee2c2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Update weather information
                document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
                document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°`;
                document.getElementById('details').textContent = `Feels Like: ${Math.round(data.main.feels_like)}° | High: ${Math.round(data.main.temp_max)}° | Low: ${Math.round(data.main.temp_min)}°`;

                // Determine if it's day or night based on location time
                const currentTime = new Date((data.dt + data.timezone) * 1000); // Convert to local time
                const hours = currentTime.getUTCHours(); // Get hours in 24-hour format

                if (hours >= 6 && hours < 18) {
                    // Morning: Show sun and sunrays
                    showSun();
                    document.body.style.background = 'linear-gradient(to bottom, #87CEEB, #4682B4)';
                } else {
                    // Night: Show moon
                    showMoon();
                    document.body.style.background = 'linear-gradient(to bottom, #2C3E50, #34495E)';
                }
            } else {
                alert('City not found.');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Functions to show/hide elements
function showSun() {
    document.querySelector('.background-sun').style.display = 'block';
    document.querySelector('.background-moon').style.display = 'none';
}

function showMoon() {
    document.querySelector('.background-moon').style.display = 'block';
    document.querySelector('.background-sun').style.display = 'none';
}

