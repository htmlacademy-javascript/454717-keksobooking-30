import { activateForm, activateSlider, setCoordinates, resetForm, setSubmitDisabled } from './upload/main';
import { initMap, activateMap, resetMap } from './map/main';
import { request } from './api';
import { renderStatus } from './status';

const BASE_URL = 'https://30.javascript.pages.academy/keksobooking';

let isMapLoaded = false;
const onDocumentMapLoaded = async () => {
  if (!isMapLoaded) {
    try {
      activateMap(await request(`${BASE_URL}/data`));
    } catch {
      renderStatus('data-error');
    }
    activateForm();
    activateSlider();
    isMapLoaded = true;
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

initMap();
