$(document).ready(function () {
  var searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", userSelections);

  var apiKey = "bLaCrcc1BEMBL6gE1i4yugAScTh1PE8ybfjBm8F1";
  //Selection variables
  var hikingQueryURL = `https://developer.nps.gov/api/v1/activities/parks?id=BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA&api_key=${apiKey}`;
  var campingQueryURL = `https://developer.nps.gov/api/v1/activities/parks?id=A59947B7-3376-49B4-AD02-C0423E08C5F7&api_key=${apiKey}`;
  var bikingQueryURL = `https://developer.nps.gov/api/v1/activities/parks?id=7CE6E935-F839-4FEC-A63E-052B1DEF39D2&api_key=${apiKey}`;

  function userSelections(event) {
    event.preventDefault();
    var newState = document.getElementById("stateChoice");
    localStorage.setItem("newState", JSON.stringify(newState.value));
    var stateObj = JSON.parse(localStorage.getItem("newState"));

    //fetch request based on StateCodes
    var stateCodeURL = `https://developer.nps.gov/api/v1/parks?stateCode=${stateObj}&api_key=${apiKey}`;
    fetch(stateCodeURL)
      .then(function (response) {
        var data = response.json();

        return data;
      })

      .then(function (data) {
          clearMapMarkers();
          clearResults();
        for (i = 0; i < data.data.length; i++) {
          console.log(data.data[i]);
          renderResults(data.data[i]);
          renderNewMarker(data.data[i]); // in google.js
          //for (j=0; j < data.data[i].activities.length; j++){
        }
      });
  }

  function clearResults() {
      var element = document.getElementById("search-results")
      removeAllChildNodes(element);
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

  function checkBoxes() {
    //Checking the checkbox selection
    if ($("#checkCamping").is(":checked")) {
      fetch(campingQueryURL)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    if ($("#checkHiking").is(":checked")) {
      fetch(hikingQueryURL)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    if ($("#checkBiking").is(":checked")) {
      fetch(bikingQueryURL)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    if ($("#checkRestrooms").is(":checked")) {
      fetch(restroomQueryURL)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }

  function renderResults(results) {
    checkBoxes();

    var searchResults = document.createElement("li");
    var parkName = document.createElement("h3");
    var parkLink = document.createElement("a");
    parkLink.setAttribute("href", results.url);

    parkName.textContent = results.fullName;
    parkLink.textContent = results.url;

    searchResults.append(parkName);
    searchResults.append(parkLink);

    document.getElementById("search-results").append(searchResults);
  }
});
