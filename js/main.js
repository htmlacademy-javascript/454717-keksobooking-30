import { activateForm, activateSlider, setCoordinates } from './upload/main';
import { initMap, activateMap } from './map/main';
import { createAnnouncementsData } from './data';

document.addEventListener('mapLoaded', () => {
  activateMap(createAnnouncementsData());
  activateForm();
  activateSlider();
});

document.addEventListener('coordinatesSelected', (event) => {
  setCoordinates(event.detail);
});

initMap();
