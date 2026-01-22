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
    const iconImg = document.querySelector("#weather-icon");
    const forecastContainer = document.querySelector("#forecast");
    const weatherDetails = document.querySelector("#weather-details");

    if (tempSpan && descSpan && iconImg && forecastContainer) {

        const apiKey = "68ef4596fdc4e030f88966f69e18b97d";
        const lat = 0.31543;
        const lon = 32.58127;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const current = data.list[0];

                tempSpan.textContent = Math.round(current.main.temp);
                descSpan.textContent = current.weather[0].description;

                iconImg.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
                iconImg.alt = current.weather[0].description;

                // Forecast
                forecastContainer.innerHTML = "";
                const labels = ["Today", "Tomorrow", "Day After"];

                for (let i = 0; i < 3; i++) {
                    const forecast = data.list[i * 8];
                    const div = document.createElement("div");
                    div.className = "forecast-day";
                    div.innerHTML = `
                        <span class="day">${labels[i]}</span>
                        <span class="temp">${Math.round(forecast.main.temp)}°C</span>
                    `;
                    forecastContainer.appendChild(div);
                }

                if (weatherDetails) {
                    weatherDetails.innerHTML = `
                        <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
                        <p><strong>Feels Like:</strong> ${Math.round(current.main.feels_like)}°C</p>
                    `;
                }
            })
            .catch(() => {
                tempSpan.textContent = "24";
                descSpan.textContent = "Partly Cloudy";
            });
    }


    
    const spotlightContainer = document.querySelector("#spotlights");

    if (spotlightContainer) {
        fetch("data/members.json")
            .then(res => res.json())
            .then(members => {
                const qualified = members.filter(
                    m => m.membership === 2 || m.membership === 3
                );

                qualified.sort(() => 0.5 - Math.random());
                const selected = qualified.slice(0, 3);

                spotlightContainer.innerHTML = "";

                selected.forEach(member => {
                    const card = document.createElement("div");
                    card.className = "spotlight";
                    card.innerHTML = `
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                        <p><strong>${member.membership === 3 ? "Gold" : "Silver"} Member</strong></p>
                    `;
                    spotlightContainer.appendChild(card);
                });
            });
    }

});
