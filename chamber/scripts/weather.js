const WEATHER_API_KEY = '2151cff2f3ea59026503915c307e7b53';
const LAT = 40.3769;
const LON = -111.7957;
const UNITS = 'imperial';

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

async function apiFetch() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentRes.ok) throw new Error('Current weather failed');
        if (!forecastRes.ok) throw new Error('Forecast failed');

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        displayWeather(current, forecast);

    } catch (error) {
        console.error(error);

        document.querySelector('#weather-display').innerHTML =
            `<p class="error-msg">Weather unavailable. Try again later.</p>`;
    }
}

function displayWeather(current, forecastData) {
    const display = document.querySelector('#weather-display');
    if (!display) return;

    const icon = current.weather[0].icon;
    const desc = current.weather[0].description;
    const temp = Math.round(current.main.temp);

    const iconUrl = (code) =>
        `https://openweathermap.org/img/wn/${code}@2x.png`;

    const forecastDays = getThreeDays(forecastData.list);

    display.innerHTML = `
        <div class="weather-now">
            <img class="weather-icon" src="${iconUrl(icon)}" alt="${desc}">
            <div>
                <div class="weather-temp">${temp}°F</div>
                <div class="weather-desc">${desc}</div>
            </div>
        </div>

        <div class="weather-forecast">
            ${forecastDays.map(day => `
                <div class="forecast-day">
                    <span class="forecast-label">${day.label}</span>
                    <img class="forecast-icon" src="${iconUrl(day.icon)}" alt="${day.desc}">
                    <span class="forecast-temp">${day.temp}°F</span>
                </div>
            `).join('')}
        </div>
    `;
}

function getThreeDays(list) {
    const sortedDays = [];
    const seenDates = new Set();
    const todayStr = new Date().toLocaleDateString('en-US');

    for (const item of list) {
        const dateObj = new Date(item.dt * 1000);
        const dateStr = dateObj.toLocaleDateString('en-US');
        const hour = dateObj.getHours();

        if (dateStr === todayStr) continue;

        if (!seenDates.has(dateStr) && hour >= 12) {
            seenDates.add(dateStr);
            sortedDays.push({
                label: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                desc: item.weather[0].description
            });
        }
    }

    return sortedDays.slice(0, 3);
}

apiFetch();