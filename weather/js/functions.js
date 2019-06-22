/* *************************************
*  Weather Site JavaScript Functions
************************************* */

console.log('My javascript is being read.');

// Variables for windchill Function Use
let temp = 31;
let speed = 5;
buildWC(speed, temp);

// Variables for  wind pointer function
let direction = "ESE";
windDial(direction);

// Variables for getCondition function
let weatherCondition = "Snowy";
let conditionKeyWord = getCondition(weatherCondition);
console.log(conditionKeyWord);

// Call changeSummaryImage function
changeSummaryImage(conditionKeyWord);

// Variables for convertMeters function
let elevation = 1514.246;
convertMeters(elevation);

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
    feelTemp.innerHTML = wc + '&deg;F';
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