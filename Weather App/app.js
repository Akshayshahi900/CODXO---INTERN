const apiKey = 'a53101a110d948510b69e1a997d824a3'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the API response for debugging

            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                document.getElementById('weather').textContent = `Weather: ${data.weather[0].description}`;

                // const iconCode = data.weather[0].icon;
                // const iconUrl = `http://openweathermap.org/img/wn/${}@2x.png`;
                // document.getElementById('weatherIcon').src ="i";
                // document.getElementById('weatherIcon').alt = data.weather[0].description;

                document.querySelector('.weather-info').classList.add('visible');
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
