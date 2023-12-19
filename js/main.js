import { createAnnouncementsData } from './data';
import { initMap, activateMap } from './map/main';
import { activateForm } from './upload/main';

document.addEventListener('mapLoading', () => {
  activateMap(createAnnouncementsData());
  activateForm();
});

initMap();

