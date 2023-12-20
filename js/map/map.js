import { leaflet } from './leaflet';
import { createCard } from './card';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ZOOM = 12;
const iconConfig = {
  url: '../img/main-pin.svg',
  width: {main: 52, normal: 40},
  height: {main: 52, normal: 40},
  anchorX: {main: 26, normal: 20},
  anchorY: {main: 52, normal: 40},
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
  iconSize: [iconConfig.width.main, iconConfig.height.main],
  iconAnchor: [iconConfig.anchorX.main, iconConfig.anchorY.main],
});

const mainPinMarker = leaflet.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (event) => {
  document.dispatchEvent(new CustomEvent('settingCoordinates', {
    detail: event.target.getLatLng()
  }));
});

const resetMap = () => {
  mainPinMarker.setLatLng(startCoordinate);
  map.setView(startCoordinate, ZOOM);
};

const icon = leaflet.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width.normal, iconConfig.height.normal],
  iconAnchor: [iconConfig.anchorX.normal, iconConfig.anchorY.normal],
});

const createMarker = (point, data) => {
  const {lat, lng} = point;
  const marker = leaflet.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCard(data));
};

const createMarkers = (announcements) => {
  announcements.forEach((announcement) => {
    createMarker(announcement.location, announcement);
  });
};

export { initMap, resetMap, createMarkers};
