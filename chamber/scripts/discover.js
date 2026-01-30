import { locations } from "../data/discover.mjs";


const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (visitMessage) {
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}


const container = document.querySelector(".discover-grid");

if (container) {
    locations.forEach((place, index) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");

        
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img 
                    src="${place.image}" 
                    alt="${place.name}" 
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button type="button">Learn More</button>
        `;

        container.appendChild(card);
    });
}
