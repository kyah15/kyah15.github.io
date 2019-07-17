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
