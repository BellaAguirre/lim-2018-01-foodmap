let map;
let service;
var infowindow;
const containerHeader = document.getElementById('title-principal');
const containerMain = document.getElementById('container-main');
const containerPlace =  document.getElementById('place-near');
containerHeader.style.visibility = 'hidden';
containerMain.style.visibility ='hidden';
window.onload = () => {
  const containerSplash = document.getElementById('container-splash');
  setTimeout(() => {
    containerSplash.style.visibility = 'hidden';
    containerSplash.style.opacity = '0';
    containerHeader.style.visibility = '';
    containerMain.style.visibility = '';
  }, 2000); 
}
// inicializando googlemaps con coordenadas desde se abrio la aplicacion
window.initMap = () => {
  const localizacion = (posicion) => {
    const latitude = posicion.coords.latitude;
    const longitude = posicion.coords.longitude;
    const pyrmont = new google.maps.LatLng(latitude,longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
    const marker = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: map});
    const request = {
      location: pyrmont,
      radius: '500',
      type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  const error = () => {
    containerPlace.innerHTML = '<p>hubo un error</p>';
  }
  navigator.geolocation.getCurrentPosition(localizacion, error);
}
// creando marcadores en el mapa
const createMarker = (place) => {
  const image = {
    url: 'icono.png',
    size: new google.maps.Size(60,60),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
    title: place.name
  });
}
// mostrando foto de los restaurantes mas cerca
const viewRestaurant = (place) => {
  for (const key in place) {
    console.log(place[key]);
    if (place[key].photos) {
     containerPlace.innerHTML += `
      <div class='col-4 col-xs-4 p-1 col-lg-3' id="${place[key].place_id}">
            <img src="${place[key].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})}" data-toggle="modal" data-target="${'#exampleModal'+ place[key].place_id}" alt="${place[key].name}" />
            <p>${place[key].name}</p>            
        <div class="modal fade" id="${'exampleModal'+ place[key].place_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${place[key].name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p><strong>Direccion: </strong>${place[key].vicinity}</p>
            <p><strong>Valoracion: </strong>${place[key].rating}</p>
            <p><strong>Estado: </strong>${place[key].opening_hours !==undefined ? place[key].opening_hours.open_now ? 'Abierto' : 'Cerrado' : 'Cerrado' }</p>            
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">Pedir ya!!!</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
}
// filtrando por nombre
const filterPlace = (place) => {
  document.getElementById('search-place').addEventListener('keyup', () => {
    const search = document.getElementById('search-place').value;
    const filterItem = place.filter(element => element.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    containerPlace.innerHTML = '';
    viewRestaurant(filterItem);
  });
}
// obteniendo los resultados de la consulta a googlemaps placesService
const callback = (results, status) => {
  const array = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      const place = results[i];
      array.push(place);
      createMarker(place);
    }
  }
  viewRestaurant(array);
  filterPlace(array);
}