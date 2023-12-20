import { createAnnouncementsData } from './data';
import { initMap, activateMap } from './map/main';
import { activateForm, deactivateForm, setCoordinates } from './upload/main';

deactivateForm();

document.addEventListener('mapLoading', () => {
  activateMap(createAnnouncementsData());
  activateForm();
});

document.addEventListener('settingCoordinates', (event) => {
  setCoordinates(event.detail);
});

initMap();

