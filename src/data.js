window.filterPlace = (place,search) => place.filter(element => element.direccion.toLowerCase().indexOf(search.toLowerCase()) > -1);
window.filterFood = (place,search) =>  place.filter(element => element.tipo.toLowerCase().indexOf(search.toLowerCase()) > -1);