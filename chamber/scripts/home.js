document.addEventListener("DOMContentLoaded", () => {

    
    const yearSpan = document.querySelector("#year");
    const modifiedSpan = document.querySelector("#lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;


    
    const menuBtn = document.querySelector("#menuBtn");
    const navList = document.querySelector("#navList");

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => {
            navList.classList.toggle("show");
        });
    }


    
    const members = document.querySelector("#members");
    const gridBtn = document.querySelector("#gridBtn");
    const listBtn = document.querySelector("#listBtn");

    if (members && gridBtn && listBtn) {
        gridBtn.addEventListener("click", () => {
            members.classList.add("grid");
            members.classList.remove("list");
        });

        listBtn.addEventListener("click", () => {
            members.classList.add("list");
            members.classList.remove("grid");
        });
    }


    
    const tempSpan = document.querySelector("#temp");
    const descSpan = document.querySelector("#desc");
    const weatherIcon = document.querySelector("#weather-icon");
    const forecastDiv = document.querySelector("#forecast");
    const weatherDetails = document.querySelector("#weather-details");

    // Stop if required elements are missing
    if (!tempSpan || !descSpan || !weatherIcon || !forecastDiv) return;

    const myKey = "68ef4596fdc4e030f88966f69e18b97d";
    const lat = 0.31543;
    const lon = 32.58127;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Weather fetch failed");
            return response.json();
        })
        .then(data => {

            /* CURRENT WEATHER */
            const current = data.list[0];
            tempSpan.textContent = Math.round(current.main.temp);
            descSpan.textContent = current.weather[0].description;

            weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
            weatherIcon.alt = current.weather[0].description;

            /* 3-DAY FORECAST */
            forecastDiv.innerHTML = "";

            const dayNames = ["Today", "Tomorrow", "Day After"];

            for (let i = 0; i < 3; i++) {
                const forecastData = data.list[i * 8];

                const day = document.createElement("div");
                day.classList.add("forecast-day");

                day.innerHTML = `
                    <span class="day">${dayNames[i]}</span>
                    <span class="temp">${Math.round(forecastData.main.temp)}°C</span>
                `;

                forecastDiv.appendChild(day);
            }
        })
        .catch(error => {
            console.error("Weather error:", error);
        });
});