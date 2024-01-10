import { activateForm, activateSlider, setCoordinates, resetForm, setSubmitDisabled } from './upload/main.js';
import { initMap, activateMap, resetMap, activateFilters } from './map/main.js';
import { request } from './api.js';
import { renderStatus } from './status.js';
import { throttle } from './utilities.js';

const BASE_URL = 'https://30.javascript.pages.academy/keksobooking';

let isMapLoaded = false;
const onDocumentMapLoaded = async () => {
  if (!isMapLoaded) {
    try {
      activateMap(await request(`${BASE_URL}/data`), throttle);
      activateFilters();
      activateForm();
      activateSlider();
      isMapLoaded = true;
    } catch {
      renderStatus('data-error');
    }
  }
};

document.addEventListener('mapLoaded', onDocumentMapLoaded);
document.addEventListener('coordinateSelected', (event) => {
  setCoordinates(event.detail);
});

document.addEventListener('formdata', async (event) => {
  try {
    setSubmitDisabled(true);
    await request(BASE_URL, {method: 'post', body: event.formData});
    resetForm();
    resetMap();
    renderStatus('success');
  } catch {
    renderStatus('error');
  } finally {
    setSubmitDisabled(false);
  }
});

document.addEventListener('formReset', () => {
  resetMap();
});

initMap();
