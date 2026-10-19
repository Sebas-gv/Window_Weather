//Codes for Meteo
// 0 = Clear sky
// 1 = Mainly clear
// 2 = Partly cloudy
// 3 = Overcast
// 61 = rain
// 71  = snow
let currentCondition = "";
let currentIsDay = 1;
let selectedIsDay = 1;

const weatherCodes = { //making the codes into an object
    0: "Clear",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
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

        if (isDay === 1) {
            dayNightElement.textContent =
                "It is currently daytime. ☀️";
        }
        else {
            dayNightElement.textContent =
                "It is currently night time. 🌙";
        }


        //button
        const clockElement = document.getElementById("clock");
        clockElement.textContent = displayTime;

        //changingimage 
        const weatherImage = document.getElementById("weatherImage");
        function updateImage(condition, isDay) {

            if (condition === "Clear" && isDay === 1) { //sunny day

                weatherImage.src = "images/day/sunny.png";

            }
            else if (condition === "Clear" && isDay === 0) { //sunny night

                weatherImage.src = "images/night/sunny.png";

            }
            else if (condition === "Rainy" && isDay === 1) { //rainy day

                weatherImage.src = "images/day/rainy.png";

            }
            else if (condition === "Rainy" && isDay === 0) { //rainy night

                weatherImage.src = "images/night/rainy.png";

            }
            else if (condition === "Snowy" && isDay === 1) { //snowy day

                weatherImage.src = "images/day/snowy.png";

            }
            else if (condition === "Snowy" && isDay === 0) { //snowy night

                weatherImage.src = "images/night/snowy.png";

            }
            else if (condition === "Mostly Clear" && isDay === 1) { //mostly sunny day

                weatherImage.src = "images/day/mostlySunny.png";

            }
            else if (condition === "Mostly Clear" && isDay === 0) { //mostly sunny night

                weatherImage.src = "images/night/mostlySunny.png";

            }
            else if ((condition === "Cloudy" || condition === "Partly Cloudy") && isDay === 1) { //cloudy day

                weatherImage.src = "images/day/Cloudy.png";

            }
            else if ((condition === "Cloudy" || condition === "Partly Cloudy") && isDay === 0) { //cloudy night

                weatherImage.src = "images/night/Cloudy.png";

            }

            else {
                console.log("No iamgefound");
            }
        }
        updateImage(condition, isDay);

        //Dropdown

        const weatherSelect = document.getElementById("weatherSelect");
        currentCondition = condition;
        currentIsDay = isDay;

        // Using change so whenever the user selects a different option from the weather dropdown menu:
        weatherSelect.addEventListener("change", () => {

            // Gets the value of the selected option
            const selectedWeather = weatherSelect.value;

            updateImage(selectedWeather, currentIsDay);

        });
        
    } catch (error) {
        console.log(error);
    }
}
//button to get the weather
const weatherBtn = document.getElementById("weatherBtn");
weatherBtn.addEventListener("click", getWeather);

getWeather();
