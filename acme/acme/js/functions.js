// Call getTabItems function
let acmeURL = "https://kyah15.github.io/acme/acme/js/acme.json";
getTabItems(acmeURL);

// Build the tab items for the home page
function buildTopNavigation (tabItems) {
    let navigationListTabs = '<li>' + 'Home' + '</li>';

    for (let i = 0, x = tabItems.length; i < x; i++) {
        navigationListTabs += '<li>' + tabItems[i] + '</li>'; 
       }
       console.log('Tab Items are: ' + navigationListTabs);
       return navigationListTabs;
}

// Gets the tab information from the ACME JSON
function getTabItems(URL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL) 
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

    let tabsArray = Object.keys(data);
    console.log(tabsArray);
    
    let topNavLinks = document.getElementById('top-nav');
      topNavLinks.innerHTML = buildTopNavigation(tabsArray);

     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

// Declaring variables for elements in ACME page
let topNav = document.getElementById('top-nav');

// Adding event listener for ACME page
topNav.addEventListener('click', function(evt){

// Get the product name
let productName = evt.target.innerHTML;
switch (productName) {
  case "Anvils":
    case "Explosives":
      case"Decoys":
        case"Traps":
        evt.preventDefault();
    break;
}


// Call fetchData function
fetchData(acmeURL);

// Fetch ACME prodcut JSON data into html
function fetchData(acmeURL){
  // let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(acmeURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);

    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[productName];

    // ************ Get the content ******************************

    // Get the picture and description data
    let locImage = g.path;
    let locDescription = g.description;

    // See if it worked
    console.log('Image path and description are: '+ locImage +" "+ locDescription);

    // Get the name, manufacturer, price and reviews
    let productTitle = g.name;
    let productManufacturer = g.manufacturer;
    let productPrice = g.price;
    let productReviews = g.reviews;

    // Display title, manufacturer, price and reviews
    console.log("Title, manu, price and reviews are "+productTitle+" "+productManufacturer+" "+productPrice+" "+productReviews);
    
    let pageTitle = document.getElementById('page-title');

    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(productTitle);
    // inserts the productTitle value before any other content that might exist
    pageTitle.innerHTML = "";
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

    // Set product description information
    let nameContent = document.getElementById('product-name');
    nameContent.innerHTML = productTitle;

    let imageContent = document.getElementById('product-picture');
    switch (locImage){
      case "/acme-project/images/products/anvil.png":
      imageContent.setAttribute("class", "anvil"); //"anvil" is the CSS rule selector
      break;
      case "/acme-project/images/products/tnt.png":
      imageContent.setAttribute("class", "tnt");
      break;
      case "/acme-project/images/products/roadrunner.jpg":
      imageContent.setAttribute("class", "roadrunner");
      break;
      case "/acme-project/images/products/trap.jpg":
      imageContent.setAttribute("class", "traps");
      break;
  }

    let descriptionContent = document.getElementById('description-paragraph');
    descriptionContent.innerHTML = locDescription;

    let manufacturerContent = document.getElementById('manufacturer-span');
    manufacturerContent.innerHTML = productManufacturer;

    let reviewsContent = document.getElementById('stars-span');
    reviewsContent.innerHTML = productReviews+"/5 stars";

    let priceContent = document.getElementById('amount-span');
    priceContent.innerHTML = "$"+productPrice;
    
    // hide home page section
    let contentContainer = document.getElementById('content-page');
    let homeContainer = document.getElementById('home-page-content');

    contentContainer.setAttribute('class', ''); // removes the hide class
    homeContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
} 
})

// Listener for homepage tab
topNav.addEventListener('click', function(evt){

  // Get the product name
let productName = evt.target.innerHTML;
  switch (productName) {
    case "Home":
          evt.preventDefault();
      break;
  }

   // hide product section
   let contentContainer = document.getElementById('content-page');
   let homeContainer = document.getElementById('home-page-content');

  contentContainer.setAttribute('class', 'hide'); // removes the hide class
  homeContainer.setAttribute('class', 'home'); // hides the status container

  // Change title to Home
  let pageTitle = document.getElementById('page-title');
  pageTitle.innerHTML = "Home";
})