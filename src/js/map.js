//https://developers.google.com/maps/documentation/javascript/examples/icon-complex
window.initMap = function () {};

//function used to display google map and create marker, uses google Javascript Map API and geolocation
//@param - [startCoords] lang long pairs
//@param - [endCoords] lang long pairs
export const initMap = function (startCoords = 0, endCoords = 0) {
  //1 GEOLOCATIONS
  let mapCoords = [];
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by the browser');
  } else {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        mapCoords.push({ lat: position.coords.latitude, lng: position.coords.longitude, color: 'blue', title: 'Current location' });
      },
      (err) => {
        alert('Cannot access your location', err);
      }
    );
  }
  //2 ADD ROUTE'S COORDS
  mapCoords.push({ lat: +startCoords[0], lng: +startCoords[1], color: 'red', title: 'Tour start' });
  mapCoords.push({ lat: +endCoords[0], lng: +endCoords[1], color: 'red', title: 'Tour end' });
  //3 CREATE MAP
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: mapCoords[0],
  });
  //4 SET MARKERS
  for (let i = 0; i < mapCoords.length; i++) {
    const marker = new google.maps.Marker({
      position: { lat: mapCoords[i].lat, lng: mapCoords[i].lng },
      map: map,
      title: mapCoords[i].title,
    });
    //https://sites.google.com/site/gmapicons/home/
    marker.setIcon(`http://labs.google.com/ridefinder/images/mm_20_${mapCoords[i].color}.png`);
  }
};
