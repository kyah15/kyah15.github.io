/* *************************************
*  Weather Site JavaScript Functions
************************************* */

console.log('My javascript is being read.');

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - agu17002@byui.edu"
    }
  };

// Setup localStorage
let storage = window.localStorage;

// Variables for status message
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

// Calculate the windchill temperature
function buildWC(speed, temp){
    let feelTemp = document.getElementById('feels-span');

// Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

// Round the answer down to integer
    wc = Math.floor(wc);

// If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

// Display the windchill
    console.log(wc);

// wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){

// Get the wind dial container
    let dial = document.getElementById("wind-pointer");
    console.log(direction);

// Determine the dial class
    switch (direction){
        case "North":
        case "N":
        dial.setAttribute("class", "n"); //"n" is the CSS rule selector
        break;
        case "NE":
        case "NNE":
        case "ENE":
        dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNW":
        case "WNW":
        dial.setAttribute("class", "nw");
        break;
        case "South":
        case "S":
        dial.setAttribute("class", "s");
        break;
        case "SE":
        case "SSE":
        case "ESE":
        dial.setAttribute("class", "se");
        break;
        case "SW":
        case "SSW":
        case "WSW":
        dial.setAttribute("class", "sw");
        break;
        case "East":
        case "E":
        dial.setAttribute("class", "e");
        break;
        case "West":
        case "W":
        dial.setAttribute("class", "w");
        break;
   }
}

// Determine the weather condition for today
function getCondition(condition){

// Get the condition
    let indicator = "clear";
    console.log(condition);

// Determine the condition and store it in a local variable
    switch (condition){
        case "Clear":
        case "Sunny":
        indicator = "clear";
        break;
        case "Partly Cloudy":
        case "Cloudy":
        case "Clouds":
        indicator = "clouds";
        break;
        case "Foggy":
        case "Fog":
        indicator = "fog";
        break;
        case "Rainny":
        case "Rain":
        case "Thunderstorms":
        indicator = "rain";
        break;
        case "Snowy":
        case "Snow":
        indicator = "snow";
        break;
    }
    console.log(indicator);
    return indicator;
}

function changeSummaryImage(weatherCondition){

// Get the weather condition
    let backgroundImage = document.getElementById("clear-indicator");
    let frameBackgroundImage = document.getElementById("columns");
    let summaryTitle = document.getElementById("summary-title");
    console.log(weatherCondition);

// Determine the dial class
    switch (weatherCondition){
        case "clear":
        backgroundImage.setAttribute("class", "tile clear-class");
        frameBackgroundImage.setAttribute("class", "tile clear-class");
        summaryTitle.innerHTML = 'Clear';
        break;
        case "clouds":
        backgroundImage.setAttribute("class", "tile clouds-class");
        frameBackgroundImage.setAttribute("class", "tile clouds-class");
        summaryTitle.innerHTML = 'Clouds';
        break;
        case "fog":
        backgroundImage.setAttribute("class", "tile fog-class");
        frameBackgroundImage.setAttribute("class", "tile fog-class");
        summaryTitle.innerHTML = 'Fog';
        break;
        case "rain":
        backgroundImage.setAttribute("class", "tile rain-class");
        frameBackgroundImage.setAttribute("class", "tile rain-class");
        summaryTitle.innerHTML = 'Rain';
        break;
        case "snow":
        backgroundImage.setAttribute("class", "tile snow-class");
        frameBackgroundImage.setAttribute("class", "tile snow-class");
        summaryTitle.innerHTML = 'Snow';
        break;
    }
}

// Convert meters to feet
function convertMeters(elevation){
    let ftelevation = document.getElementById('elevation-span');

// Compute the elevation in feet
    let feetElevation = elevation * 3.281;
    console.log(feetElevation);

// Round the answer down to integer
    feetElevation = Math.floor(feetElevation);

// Display the elevation in Feet
    console.log(feetElevation);

// Display the elevation in HTML file
    ftelevation.innerHTML = feetElevation + ' ft.';
}

// Function to convert and format hours to 12 hour format.

function format_time(hour) {
    if(hour > 23){ 
        hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
        hour -= 12; 
    } 
    if(hour == 0) { 
        hour = "12"; 
    } 
    return hour + amPM;
}

// function to build hourly temperature list

function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
}

// function to determine north or south

function degreesNorthSouth(degrees) {
    let locationDegrees;
    if (degrees < 0) {
        locationDegrees = parseFloat(Math.abs(degrees)).toFixed(2)+String.fromCharCode(176)+" S";
    } else {
        locationDegrees = parseFloat(degrees).toFixed(2)+String.fromCharCode(176)+" N";
    }

    return locationDegrees;
}

function degreesEastWest(degrees) {
    let locationDegrees;
    if (degrees < 0) {
        locationDegrees = parseFloat(Math.abs(degrees)).toFixed(2)+String.fromCharCode(176)+" E";
    } else {
        locationDegrees = parseFloat(degrees).toFixed(2)+String.fromCharCode(176)+" W";
    }

    return locationDegrees;
}

// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
    // Let's see what we got back
    console.log('Json object from getLocation function:'); 
    console.log(data);
    // Store data to localstorage 
    storage.setItem("locName", data.properties.relativeLocation.properties.city); 
    storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
    // Next, get the weather station ID before requesting current conditions 

    // URL for station list is in the data object 
    let stationsURL = data.properties.observationStations; 
    // Call the function to get the list of weather stations
    getStationId(stationsURL); 
    // URL for hourly forecast
    let hourlyForecastURL = data.properties.forecastHourly;
    //   Call the function to get the hourly temperatures
    getHourly(hourlyForecastURL);
    
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);

      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let currentTempId = data.properties.temperature.value; 
      let feelsLikeId = data.properties.heatIndex.value;
      let weatherSummaryId = data.properties.textDescription;    
      console.log('Current temperature, feels like temp and weather summary are: ' + currentTempId, feelsLikeId, weatherSummaryId); 
   
      // Store weather information to localStorage 
      storage.setItem("currentTempId", currentTempId);
      storage.setItem("feelsLikeId", feelsLikeId); 
      storage.setItem("weatherSummaryId", weatherSummaryId); 
   
      // Build the page for viewing 
      buildPage();
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

// Gets the hourly temperatures
function getHourly(hourlyForecastURL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(hourlyForecastURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From hourlyForecastURL function:'); 
      console.log(data);

      // Set the hourly temperature information
      // Variables for hourlyTemp functions
      // Get the next hour based on the current time
      let date = data.properties.periods[0].startTime; 
      let nextHour = parseInt(date.substr(11, 2));
      let numberOfHours = 13;
      let hourlyTemps = [];

      for (let i = 0; i < numberOfHours; i++) {

        hourlyTemps[i] = data.properties.periods[i].temperature;
   
        }
    
        console.log("hourly temps are "+ hourlyTemps);
      let contentHourlyTemps = document.getElementById('hourly-temps');
      console.log("date and next hour are "+date+" "+nextHour);
      contentHourlyTemps.innerHTML = buildHourlyData(nextHour, hourlyTemps);

      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let windSpeedId = data.properties.periods[0].windSpeed.substr(0, 2);
      let windDirectionId = data.properties.periods[0].windDirection; 
         
      console.log('Wind speed and wind direction are: ' + windSpeedId, windDirectionId); 
   
      // Store weather information to localStorage 
      storage.setItem("windSpeedId", windSpeedId);
      storage.setItem("windDirectionId", windDirectionId);
        


     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
}

// Inject stored vallues into web page

function buildPage(){
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    const windSpeed = document.getElementById('speed-mph');
    windSpeed.innerHTML = storage.windSpeedId;

    const windDirection = document.getElementById('direction');
    windDirection.innerHTML = storage.windDirectionId;

    const windPointer = document.getElementById('wind-pointer');
    
    buildWC(storage.windSpeedId, convertToFarenheit(storage.currentTempId));

    // Task 2 - Populate location information
    const city = document.getElementById('city');
    city.innerHTML = storage.locName;

    const state = document.getElementById('state');
    state.innerHTML = storage.locState;

    const elevation = document.getElementById('elevation-span');
    elevation.innerHTML = storage.stationElevation;

    const longitude = document.getElementById('north-south');
    longitude.innerHTML = degreesNorthSouth(storage.long);

    const latitude = document.getElementById('east-west');
    latitude.innerHTML = degreesEastWest(storage.lat);

    // Task 3 - Populate weather information
    const currentTemp = document.getElementById('currtemp');
    currentTemp.innerHTML = parseFloat(convertToFarenheit(storage.currentTempId)).toFixed(0);

    const weatherSummary = document.getElementById('clear-indicator');

    // Task 4 - Hide status and show main
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
}

// function to convert Celsius to Farenheit
function convertToFarenheit(degrees) {
    let farDegrees = (degrees * (9/5)) + 32;
    return farDegrees;
}


