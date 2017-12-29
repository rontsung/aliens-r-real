// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $datetimeInput = document.querySelector("#datetime");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $nextBtn = document.querySelector("#next");
var $previousBtn = document.querySelector("#previous");

var abbrev = {
  "Alabama": "AL",
  "Alaska": "AK",
  "American Samoa": "AS",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  "Florida": "FL",
  "Georgia": "GA",
  "Guam": "GU",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Marshall Islands": "MH",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Palau": "PW",
  "Pennsylvania": "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virgin Islands": "VI",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
  "usa": "us",
  "united states": "us",
  "united states of america": "us",
  "america": "us",
  "great britain": "gb",
  "britain": "gb",
  "canada":"ca",
  "australia":"au"
  }

var fook = 0
// var countries = []
// for (var i =0; i<dataSet.length; i++) {
//   // console.log(dataSet[i].country,countries.indexOf(dataSet[i].country) != -1 );
//   if (countries.indexOf(dataSet[i].country) != -1) {
//     continue
//   }
 
//   countries.push(dataSet[i].country);
  
// }
// console.log(countries)
// console.log(Object.keys(abbrev));
// for (var i = 0; i<Object.keys(abbrev).length;i++){
//   console.log(abbrev[Object.keys(abbrev)[i]])
// }
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$nextBtn.addEventListener("click", addto);
$previousBtn.addEventListener("click", subtractfrom);
$nextBtn.addEventListener("click", renderTable);
$previousBtn.addEventListener("click", renderTable);

function addto() {
  if (fook+10>=filteredAddresses.length) {
    fook = fook
  }
  else {
  fook = fook + 10
  }
}
function subtractfrom() {
  if (fook===0) {
    fook = fook
  }
  else {
  fook = fook - 10
  }
}
// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  
  $tbody.innerHTML = "";
  var k = 0;
  for (var i = fook; i < filteredAddresses.length; i++) {
    // Get get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(k);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
    k=k+1
    // count = k
        if (k>=10) {
      break;
    }
  }
}

function handleSearchButtonClick() {
  // user input variables
  var stateIn = $stateInput.value.trim().toLowerCase();
  var cityIn = $cityInput.value.trim().toLowerCase();
  var countryIn = $countryInput.value.trim().toLowerCase();
  var dateIn = $datetimeInput.value.trim().toLowerCase();
  var shapeIn = $shapeInput.value.trim().toLowerCase();

  if (dateIn.charAt(0)==="0") {
    dateIn = dateIn.substring(1)
  }

  if (dateIn.charAt(dateIn.indexOf("/")+1)==="0") {
    dateIn = dateIn.substring(0,dateIn.indexOf("/")+1)+dateIn.substring(dateIn.indexOf("/")+2)
  }
  var f = Object.keys(abbrev);
  for (var i = 0; i<f.length;i++){
    if (stateIn === f[i].toLowerCase()) {
      stateIn = abbrev[f[i]].toLowerCase()
    }
    if (countryIn === f[i].toLowerCase()) {
      countryIn = abbrev[f[i]].toLowerCase()
    }
  }
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = [stateIn, cityIn, countryIn, dateIn, shapeIn];

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filteredAddresses = dataSet.filter(function(address) {
    var addressState = [address.state.toLowerCase(),address.city.toLowerCase(),address.country.toLowerCase(),address.datetime.toLowerCase(), address.shape.toLowerCase()];

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    var check = true;
    for (var i = 0; i < addressState.length; i++) {
      if (filterState[i] === ""){
        continue

      }
      if (filterState[i] != addressState[i]) {
        check = false
      }

    }
    return check;
  });
  count = 0
  fook = 0
  renderTable();
}

// Render the table for the first time on page load
renderTable();
