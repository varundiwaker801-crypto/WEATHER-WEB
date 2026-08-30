
const search = document.querySelector("#search");
const temperature = document.querySelector(".box");
const wind = document.querySelector(".box2");
const time = document.querySelector(".box3");
const cityName = document.querySelector(".box4");
const weatherCondition = document.querySelector(".box5");
const humidity = document.querySelector(".box6");


window.addEventListener("load", async () => {
    const latitude = 28.6139;
    const longitude = 77.2090;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

    const response = await fetch(weatherURL);
    const weatherInfo = await response.json();

    const humidityValue = weatherInfo.hourly.relative_humidity_2m[38];

        humidity.innerText = humidityValue + " %";

    temperature.innerText = weatherInfo.current.temperature_2m + "°C";
    wind.innerText = weatherInfo.current.wind_speed_10m + "km/h";

    const date = new Date(weatherInfo.current.time);
        const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
        });
    time.innerText= formattedTime;
   
    cityName.innerText = "Delhi";

    const weatherCode =  weatherInfo.current.weather_code;

if (weatherCode === 0) {
    weatherCondition.innerText = "☀️ Clear Sky";
} else if (weatherCode >= 1 && weatherCode <= 3) {
    weatherCondition.innerText = "☁️ Cloudy";
} else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherCondition.innerText = "🌧️ Rain";
} else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherCondition.innerText = "❄️ Snow";
} else if (weatherCode >= 80 && weatherCode <= 82) {
    weatherCondition.innerText = "🌦️ Rain Showers";
} else if (weatherCode >= 95 && weatherCode <= 99) {
    weatherCondition.innerText = "⛈️ Thunderstorm";
}


});
 
//----search-option---

search.addEventListener("keydown", async(event) => {
    if (event.key === "Enter") {
       const city = search.value;

       const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;

       const response = await fetch(geoURL);
       const getData = await response.json();

       console.log(getData);

         // 2. Latitude & longitude 

         const latitude = getData.results[0].latitude;
         const longitude = getData.results[0].longitude;

         console.log(latitude);
         console.log(longitude);


         // 3.Latitude & longitude -> weather

         const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`

         const weatherResponse = await fetch(weatherURL);
         const weatherData = await weatherResponse.json();

         console.log(weatherData);


         const humidityValue = weatherData.hourly.relative_humidity_2m[38];

        humidity.innerText = humidityValue + " %";

         temperature.innerText= weatherData.current.temperature_2m + "°C";
        wind.innerText= weatherData.current.wind_speed_10m + "km/h";


        const date = new Date(weatherData.current.time);
        const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
        });
        time.innerText= formattedTime;
        cityName.innerText = search.value.trim();

        const weatherCode = weatherData.current.weather_code;

if (weatherCode === 0) {
    weatherCondition.innerText = "☀️ Clear Sky";
} else if (weatherCode >= 1 && weatherCode <= 3) {
    weatherCondition.innerText = "☁️ Cloudy";
} else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherCondition.innerText = "🌧️ Rain";
} else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherCondition.innerText = "❄️ Snow";
} else if (weatherCode >= 80 && weatherCode <= 82) {
    weatherCondition.innerText = "🌦️ Rain Showers";
} else if (weatherCode >= 95 && weatherCode <= 99) {
    weatherCondition.innerText = "⛈️ Thunderstorm";
}

    }

});