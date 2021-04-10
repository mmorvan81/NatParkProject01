//Initialize Map
var map;
var ohio;
let markers = [];

function initMap() {
  ohio = new google.maps.LatLng(39.983334, -82.98333);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: ohio,
    zoom: 6,
  });
}

// Handle the json to add markers
function renderNewMarker(json) {
  console.log(json.fullName);
  console.log("JSON", json);

  // Display markers on Google Maps
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(json.latitude, json.longitude),
    map,
  });

  map.setCenter(new google.maps.LatLng(json.latitude, json.longitude), 16);
  markers.push(marker);
}

// Clearing map markers on every new search
function clearMapMarkers() {
  for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
  }
}
