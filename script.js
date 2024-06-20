const apiKey = '45901542f4867835916a8ee45a3dcc07'; // Replace with your OpenWeatherMap API key

const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value;
    getWeather(searchTerm);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = await response.json();

        const { main, name, sys, weather } = weatherData;
        const temp = Math.round(main.temp);
        const description = weather[0].description;
        const country = sys.country;

        const weatherHTML = `
            <h2>${name}, ${country}</h2>
            <p>${temp}°C</p>
            <p>${description}</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Failed to fetch weather data</p>';
    }
}
