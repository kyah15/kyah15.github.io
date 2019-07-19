
// Declaring variables for elements in Greenville page
let topNav = document.getElementById('top-nav');
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

topNav.addEventListener('click', function(evt){

// Get the city name
let cityName = evt.target.innerHTML;
switch (cityName) {
  case "Franklin":
    case "Greenville":
      case"Springfield":
        evt.preventDefault();
    break;
}
// Variable for fechtData function and call of the function
let weatherURL = "https://kyah15.github.io/weather/js/weather.json/weather.json";

fetchData(weatherURL);

// function to fecht the data
function fetchData(weatherURL){
  // let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let currentTemp = g.Temp;
    let lowTemp = g.Low;
    let highTemp = g.High;

    console.log("temp is "+currentTemp+", low temp is "+lowTemp+", high temp is "+highTemp);
    // Get the wind data 
    let wind = g.Wind;
    let windDirection = g.Direction;
    let gusts = g.Gusts;
    let summary = g.Summary;
    buildWC(wind, currentTemp);

    console.log("wind, direction, gusts and summary are: "+wind+" "+windDirection+" "+gusts+" "+summary);
    // Get the current conditions
    let longitude = g.Longitude;
    let latitude = g.Latitude;
    let elevation = g.Elevation;
    let zip = g.Zip; 

    console.log("longitude, latitude, elevation and zip are "+longitude+" "+latitude+" "+elevation+" "+zip);
    // Get the hourly data
    let hourlyTemps = g.Hourly;

    console.log("the hourly temperatures are "+hourlyTemps);
    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    let contentZip = document.getElementById('zip-code');
    contentZip.innerHTML = zip;
    convertMeters(elevation);
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"

    // Set the temperature information
    let contentCurrentTemp = document.getElementById('current-temperature');
    let contentLowTemp = document.getElementById('min-temperature');
    let contentHighTemp = document.getElementById('max-temperature');
    let contentLongitude = document.getElementById('north-south');
    let contentLatitude = document.getElementById('east-west');
    contentCurrentTemp.innerHTML = currentTemp+String.fromCharCode(176)+"F";
    contentLowTemp.innerHTML = lowTemp+String.fromCharCode(176)+"F";
    contentHighTemp.innerHTML = highTemp+String.fromCharCode(176)+"F ";
    contentLongitude.innerHTML = degreesNorthSouth(longitude);
    contentLatitude.innerHTML = degreesEastWest(latitude);

    // Set the wind information
    let contentWind = document.getElementById('speed');
    let contentDirection = document.getElementById('direction');
    let contentGusts = document.getElementById('gusts');
    contentWind.innerHTML = wind+" mph";
    contentDirection.innerHTML = windDirection;
    contentGusts.innerHTML = gusts+" mph";
    windDial(windDirection);

    // Set the current conditions information
    let conditionKeyWord = getCondition(summary);
    console.log(conditionKeyWord);

    // Call changeSummaryImage function
    changeSummaryImage(conditionKeyWord);

    // Set the hourly temperature information
    // Variables for hourlyTemp functions
    // Get the next hour based on the current time
    let date = new Date(); 
    let nextHour = date.getHours() + 1;
    let contentHourlyTemps = document.getElementById('hourly-temps');
    console.log("date and next hour are"+date+" "+nextHour);
    contentHourlyTemps.innerHTML = buildHourlyData(nextHour, hourlyTemps);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
} 
// Ends the function


// Add function for bottom nav for small wireframe
pageNav.addEventListener('click', function(evt){

  // Get the city name
  let cityName = evt.target.innerHTML;
  switch (cityName) {
    case "Franklin":
      case "Greenville":
        case"Springfield":
          evt.preventDefault();
      break;
  }
  // Variable for fechtData function and call of the function
  let weatherURL = "https://kyah15.github.io/weather/js/weather.json/weather.json";
  
  // fetchData(weatherURL);
  
  // function to fecht the data
  // function fetchData(weatherURL){
    // let cityName = 'Greenville'; // The data we want from the weather.json file
    fetch(weatherURL)
    .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the greenville part
      // shorten the variable and focus only on the data we want to reduce typing
      let g = data[cityName];
  
      // ************ Get the content ******************************
  
      // Get the location data
      let locName = g.City;
      let locState = g.State;
      // Put them together
      let fullName = locName+', '+locState;
      // See if it worked
      console.log('fullName is: '+fullName);
  
      // Get the temperature data
      let currentTemp = g.Temp;
      let lowTemp = g.Low;
      let highTemp = g.High;
  
      console.log("temp is "+currentTemp+", low temp is "+lowTemp+", high temp is "+highTemp);
      // Get the wind data 
      let wind = g.Wind;
      let windDirection = g.Direction;
      let gusts = g.Gusts;
      let summary = g.Summary;
      buildWC(wind, currentTemp);
  
      console.log("wind, direction, gusts and summary are: "+wind+" "+windDirection+" "+gusts+" "+summary);
      // Get the current conditions
      let longitude = g.Longitude;
      let latitude = g.Latitude;
      let elevation = g.Elevation;
      let zip = g.Zip; 
  
      console.log("longitude, latitude, elevation and zip are "+longitude+" "+latitude+" "+elevation+" "+zip);
      // Get the hourly data
      let hourlyTemps = g.Hourly;
  
      console.log("the hourly temperatures are "+hourlyTemps);
      // ************ Display the content ******************************
      // Set the title with the location name at the first
      // Gets the title element so it can be worked with
      let pageTitle = document.getElementById('page-title');
      // Create a text node containing the full name 
      let fullNameNode = document.createTextNode(fullName);
      // inserts the fullName value before any other content that might exist
      pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
      // When this is done the title should look something like this:
      // Greenville, SC | The Weather Site
  
      // Set the Location information
      let contentZip = document.getElementById('zip-code');
      contentZip.innerHTML = zip;
      convertMeters(elevation);
      // Get the h1 to display the city location
      let contentHeading = document.getElementById('contentHeading');
      contentHeading.innerHTML = fullName;
      // The h1 in main h1 should now say "Greenville, SC"
  
      // Set the temperature information
      let contentCurrentTemp = document.getElementById('current-temperature');
      let contentLowTemp = document.getElementById('min-temperature');
      let contentHighTemp = document.getElementById('max-temperature');
      let contentLongitude = document.getElementById('north-south');
      let contentLatitude = document.getElementById('east-west');
      contentCurrentTemp.innerHTML = currentTemp+String.fromCharCode(176)+"F";
      contentLowTemp.innerHTML = lowTemp+String.fromCharCode(176)+"F";
      contentHighTemp.innerHTML = highTemp+String.fromCharCode(176)+"F ";
      contentLongitude.innerHTML = degreesNorthSouth(longitude);
      contentLatitude.innerHTML = degreesEastWest(latitude);
  
      // Set the wind information
      let contentWind = document.getElementById('speed');
      let contentDirection = document.getElementById('direction');
      let contentGusts = document.getElementById('gusts');
      contentWind.innerHTML = wind+" mph";
      contentDirection.innerHTML = windDirection;
      contentGusts.innerHTML = gusts+" mph";
      windDial(windDirection);
  
      // Set the current conditions information
      let conditionKeyWord = getCondition(summary);
      console.log(conditionKeyWord);
  
      // Call changeSummaryImage function
      changeSummaryImage(conditionKeyWord);
  
      // Set the hourly temperature information
      // Variables for hourlyTemp functions
      // Get the next hour based on the current time
      let date = new Date(); 
      let nextHour = date.getHours() + 1;
      let contentHourlyTemps = document.getElementById('hourly-temps');
      console.log("date and next hour are"+date+" "+nextHour);
      contentHourlyTemps.innerHTML = buildHourlyData(nextHour, hourlyTemps);
  
      // Change the status of the containers
      contentContainer.setAttribute('class', ''); // removes the hide class
      statusContainer.setAttribute('class', 'hide'); // hides the status container
    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
  // } Ends the function
  })

  