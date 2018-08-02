var map;
var service;
var infowindow;

function initMap() {
  
  function localizacion (posicion) {
      const latitude = posicion.coords.latitude;
      const longitude = posicion.coords.longitude;
      var pyrmont = new google.maps.LatLng(latitude,longitude);

      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });
    
      var request = {
        location: pyrmont,
        radius: '500',
        type: ['restaurant']
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
  }
  function error(){
    console.log('hubo un error')
  }
  navigator.geolocation.getCurrentPosition(localizacion,error);

}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      
      // createMarker(results[i]);
    }
  }
}
/* function createMarker (place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker ({
    mapa: map,
    posición: place.geometry.location
  });

  google.maps.event.addListener (marcador, 'click', function () {
    infowindow.setContent (place.name);
    infowindow.open (map, this);
  });
} */