const config = {
  apiKey: 'AIzaSyC2RzmstCckIkInzF8hsHScfSy152fBn3g',
  authDomain: 'foodmap-ed9cc.firebaseapp.com',
  databaseURL: 'https://foodmap-ed9cc.firebaseio.com',
  projectId: 'foodmap-ed9cc',
  storageBucket: 'foodmap-ed9cc.appspot.com',
  messagingSenderId: '286710424042'
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(user)
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});
const createDataPlace = (place) => {
  const userId = firebase.auth().currentUser.uid;
  console.log(place);
  
  firebase.database().ref('places/' + userId).push({
    hola: place.name
  })
}

document.getElementById('search-place').addEventListener('keyup', () => {
 const search = document.getElementById('search-place').value;

})

let map;
let service;
var infowindow;
const containerHeader = document.getElementById('title-principal');
const containerMain = document.getElementById('container-main');
containerHeader.style.visibility = 'hidden';
containerMain.style.visibility ='hidden';
window.onload = () => {
  const container = document.getElementById('contenedor-carga');
  setTimeout(() => {
    container.style.visibility = 'hidden';
    container.style.opacity = '0';
  containerHeader.style.visibility = '';
  containerMain.style.visibility = '';
  }, 2000);
  
}
window.initMap = () => {
  const localizacion = (posicion) => {
      const latitude = posicion.coords.latitude;
      const longitude = posicion.coords.longitude;
      var pyrmont = new google.maps.LatLng(latitude,longitude);
      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });
      var marker = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: map});

      const request = {
        location: pyrmont,
        radius: '500',
        type: ['restaurant']
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
  }
  const error = () => {
    console.log('hubo un error');
  }
  navigator.geolocation.getCurrentPosition(localizacion, error);
}
const createMarker = (place) => {
  const image = {
    url: 'icono.png',
    size: new google.maps.Size(60,60),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(15, 15)
  };
  // var placeLoc = place.geometry.location;
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
    title: place.name
  });
}
const hola = () => {
  alert('hola')
}
const viewRestaurant = (place) => {
  console.log(place)
  for (const key in place) {
    if(key === 'photos') {
      document.getElementById('place-near').innerHTML += `
        <div class='col-4 col-xs-4 p-1'>
            <img src='${place[key][0].getUrl({'maxWidth': 200, 'maxHeight': 200})}' onclick='hola()' alt='' />            
        </div>
        `;
    }
  }
}
const callback = (results, status) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      const place = results[i];
      createMarker(place);
      viewRestaurant(place);
      createDataPlace(place);
    }
  }
}

