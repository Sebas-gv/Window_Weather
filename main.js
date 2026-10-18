//Codes for Meteo
// 0 = Clear sky
// 1 = Mainly clear
// 2 = Partly cloudy
// 3 = Overcast
// 61 = rain
// 71  = snow
const weatherCodes = { //making the codes into an object
    0: "Sunny",
    1: "Mostly Sunny", 
    3: "Cloudy", //2: "Partly Cloudy", we can combine these 2     
    61: "Rainy",
    71: "Snowy"
};

const getWeather = async () => { //we use async an await to fetch the api
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=51.0501&longitude=-114.0853&hourly=is_day&current=temperature_2m,weather_code&timezone=auto&forecast_days=1";

    try { //Using try and catch to fetch the url
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather data");
        }

        const data = await response.json();
        console.log("getting elements...");
        // console.log(data);// Testing retriving correct information
        // console.log(data.current.temperature_2m);//Testing specific info
        // console.log(data.current.weather_code);


        //Creating variables from the Json

        const condition = weatherCodes[data.current.weather_code]; // creating a variable to get the weather code {get the index and replace the info in the object of codes}

        // console.log(condition)//testing if it's works
        const temperature = data.current.temperature_2m;

        const currentTime = data.current.time; //It gives 2026-10-17T16:30 for example

        const displayTime = currentTime.slice(11, 16);

        const currentHour = currentTime.slice(0, 13) + ":00";  // "2026-10-17T16:00"

        const index = data.hourly.time.indexOf(currentHour); //The index goes from 0 to 23 in the Json

        const isDay = data.hourly.is_day[index]; // getting the night day value from the api  (In the Json wach index has 1 for day and 0 for night) so if we use the index of the current hour we get the state of the day

        console.log(temperature);
        console.log(condition);
        console.log(displayTime);
        console.log(isDay);

        //getting the references
        const temperatureElement =
        document.getElementById("temperature");

        const conditionElement =
        document.getElementById("condition");

        const timeElement =
        document.getElementById("time");
        
        //Displaying the data
        temperatureElement.textContent = `Temperature: ${temperature} °C`;

        conditionElement.textContent = `Condition: ${condition}`;

        timeElement.textContent = `Time: ${displayTime}`;

        //Day or night:
        const dayNightElement = document.getElementById("dayNight");

        if (isDay === 1) 
        {
            dayNightElement.textContent =
            "It is currently daytime. ☀️";
        } 
        else {
            dayNightElement.textContent =
            "It is currently nighttime. 🌙";
        }

        const weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.addEventListener("click", getWeather);
        
        //button
        const clockElement = document.getElementById("clock");
        clockElement.textContent = displayTime;

    } catch (error) {
        console.log(error);
    }
}

getWeather();
