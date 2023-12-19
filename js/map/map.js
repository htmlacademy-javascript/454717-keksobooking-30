import { leaflet } from './leaflet';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ZOOM = 10;
const iconConfig = {
  url: '../img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const cityCenter = {
  lat: 35.68306,
  lng: 139.75436,
};
const startCoordinate = {
  lat: 35.68306,
  lng: 139.75436,
};

const map = leaflet.map('map-canvas');

const initMap = () => {
  map
    .on('load', () => {
      document.dispatchEvent(new Event('mapLoading'));
    })
    .setView(cityCenter, ZOOM);
};

leaflet.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const mainPinIcon = leaflet.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const mainPinMarker = leaflet.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (event) => {
  console.log(event.target.getLatLng());
});

const resetMap = () => {
  mainPinMarker.setLatLng(startCoordinate);
  map.setView(startCoordinate, ZOOM);
};

export { initMap, resetMap};
