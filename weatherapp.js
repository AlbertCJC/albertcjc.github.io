const WeatherApi = "4b642e7a9887e807ce3c08587248acd0";

const weatherData = document.querySelector(".Weather-Data");
const cityInput = document.getElementById("city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit",(event) =>{
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
})

const getWeatherData = async (cityValue) =>{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${WeatherApi}&units=metric`);
        if(!response.ok){
            throw new Error("Network Response Error");}

        const data = await response.json();
        const icon = data.weather[0].icon;
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const details = [
            `Humidity: ${data.main.humidity} %`,
            `Wind Speed: ${data.wind.speed} km/s`
        ]
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Idon">`
        weatherData.querySelector(".temperature").textContent = `${temp}°C`;
        weatherData.querySelector(".description").textContent = toPascalCase(description); 
        weatherData.querySelector(".details").innerHTML = details.map(detail =>`<div>${detail}</div>`).join("");
    }catch(error){
        weatherData.querySelector(".icon").innerHTML = `Location Not Found, Please Try Again`
        weatherData.querySelector(".temperature").textContent = ``;
        weatherData.querySelector(".description").textContent = ``; 
        weatherData.querySelector(".details").innerHTML = ``;
    }
}
function toPascalCase(string) {
    return `${string}`
      .toLowerCase()
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }