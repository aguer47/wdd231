
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');



// creating a varaiable
const myKey = "68ef4596fdc4e030f88966f69e18b97d"
const myLat = "49.7493783231352"
const myLon = "6.636398916624047"


const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=celcius`;

async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // temperature
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;

    // weather icon
    const iconsrc = `//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;

    // set attributes
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    
    captionDesc.textContent = desc;
}

// invoke the function
apiFetch();