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

// mostrando foto de los restaurantes mas cerca
const viewRestaurant = (place) => {
  for (const key in place) {
     containerPlace.innerHTML += `
      <div class='col-4 col-xs-4 p-1 col-lg-3' id="${place[key].id}">
            <img src="${place[key].photo}" data-toggle="modal" data-target="${'#exampleModal'+ place[key].id}" alt="${place[key].name}" />
            <p>${place[key].name}</p>
        <div class="modal fade" id="${'exampleModal'+ place[key].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${place[key].name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p><strong>Direccion: </strong>${place[key].direccion}</p>
            <p><strong>Horario: </strong>${place[key].horario}</p>
            <p><strong>Telefono: </strong>${place[key].telefono}</p>
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
// filtrando por nombre
const filterPlaceDirection = (place) => {
  document.getElementById('search-place-direction').addEventListener('change', () => {
    const search = document.getElementById('search-place-direction').value;
    const filterItem = filterPlace(place,search);
    containerPlace.innerHTML = '';
    viewRestaurant(filterItem);
    document.getElementById('search-place').addEventListener('keyup', () => {
      const search = document.getElementById('search-place').value;
      const filterItems = filterFood(filterItem,search);
      containerPlace.innerHTML = '';
      viewRestaurant(filterItems);
    });
  });
}

// Obteniendo data
const xhrData = new XMLHttpRequest();
xhrData.open('GET',`../data/places.json`);
xhrData.onreadystatechange = () => {
  if (xhrData.readyState == 4) {
     if(xhrData.status == 200)
        var placesData = JSON.parse(event.currentTarget.responseText);
        viewRestaurant(placesData)
        filterPlaceDirection(placesData)
  }
};
xhrData.send();