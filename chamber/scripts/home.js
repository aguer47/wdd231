document.addEventListener("DOMContentLoaded", () => {

    /* ================= YEAR & LAST MODIFIED ================= */
    const yearSpan = document.querySelector("#year");
    const modifiedSpan = document.querySelector("#lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;


    /* ================= MOBILE MENU ================= */
    const menuBtn = document.querySelector("#menuBtn");
    const navList = document.querySelector("#navList");

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => {
            navList.classList.toggle("show");
        });
    }


    /* ================= GRID / LIST VIEW ================= */
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


    /* ================= WEATHER ================= */
    const tempSpan = document.querySelector("#temp");
    const descSpan = document.querySelector("#desc");
    const weatherIcon = document.querySelector("#weather-icon");
    const forecastDiv = document.querySelector("#forecast");

    if (tempSpan && descSpan && weatherIcon && forecastDiv) {

        const myKey = "68ef4596fdc4e030f88966f69e18b97d";
        const lat = 0.31543;
        const lon = 32.58127;

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {

                const current = data.list[0];
                tempSpan.textContent = Math.round(current.main.temp);
                descSpan.textContent = current.weather[0].description;

                weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
                weatherIcon.alt = current.weather[0].description;
                weatherIcon.hidden = false;

                forecastDiv.innerHTML = "";
                const dayNames = ["Today", "Tomorrow", "Day After"];

                for (let i = 0; i < 3; i++) {
                    const forecast = data.list[i * 8];

                    const div = document.createElement("div");
                    div.className = "forecast-day";
                    div.innerHTML = `
                        <span class="day">${dayNames[i]}</span>
                        <span class="temp">${Math.round(forecast.main.temp)}°C</span>
                    `;

                    forecastDiv.appendChild(div);
                }
            })
            .catch(err => console.error("Weather error:", err));
    }


    
    /*  MEMBER SPOTLIGHTS */
    fetch("data/members.json")
        .then(response => {
            if (!response.ok) throw new Error("Members fetch failed");
            return response.json();
        })
        .then(members => {

            const spotlightContainer = document.querySelector("#spotlights");
            if (!spotlightContainer) return;

            // Gold (3) and Silver (2) only
            const qualified = members.filter(
                member => member.membership === 3 || member.membership === 2
            );

            // Shuffle and select 3
            const shuffled = qualified.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            spotlightContainer.innerHTML = "";

            selected.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight");

                card.innerHTML = `
        <!-- Company Logo -->
        <div class="company-logo">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        </div>
        
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>ADDRESS:</strong> ${member.address}</p>
        <p><strong>PHONE:</strong> ${member.phone}</p>
        <p>
          <strong>WEBSITE:</strong>
          <a href="${member.website}" target="_blank">${member.website}</a>
        </p>
        <div class="membership-badge">
          ${member.membership === 3 ? "⭐ Gold Member" : "🌟 Silver Member"}
        </div>
      `;

                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Spotlight error:", error);
            const spotlightContainer = document.querySelector("#spotlights");
            if (spotlightContainer) {
                spotlightContainer.innerHTML = "<p>Unable to load member spotlights. Please try again later.</p>";
            }
        });


});
