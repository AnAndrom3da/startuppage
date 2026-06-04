function updateTime() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');

    document.getElementById("time").textContent = `${h}:${m}`;
}

function updateDate() {
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    document.getElementById("date").textContent =
        now.toLocaleDateString('en-US', options);
}

function updateAll() {
    updateTime();
    updateDate();
}

setInterval(updateAll, 1000);
updateAll();

async function getWeather() {
    const apiKey = "6d06c6c2bd7d3b8053df8c5c601cbcad";
    const city = "Paris";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("Weather API response:", data);

        if (!res.ok) {
            console.log("Weather API error:", data.message);
            return;
        }

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;

        let icon = "🌙";
        if (desc.includes("rain")) icon = "🌧️";
        else if (desc.includes("cloud")) icon = "☁️";
        else if (desc.includes("clear")) icon = "☀️";
        else if (desc.includes("snow")) icon = "❄️";

        document.querySelector(".weather h3").textContent = `${temp}°`;
        document.querySelector(".weather small").innerHTML =
            `${desc}<br/>${city}`;

        document.querySelector(".weather-icon").textContent = icon;

    } catch (err) {
        console.log("Fetch failed:", err);
    }
}
getWeather();
setInterval(getWeather, 60000);
