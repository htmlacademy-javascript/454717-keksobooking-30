import { activateForm, activateSlider, setCoordinates } from './upload/main';
import { initMap, activateMap } from './map/main';
import { createAnnouncementsData } from './data';

let isMapLoaded = false;
document.addEventListener('mapLoaded', () => {
  if (!isMapLoaded) {
    activateMap(createAnnouncementsData());
    activateForm();
    activateSlider();
    isMapLoaded = true;
  }
});

document.addEventListener('coordinatesSelected', (event) => {
  setCoordinates(event.detail);
});

initMap();
