import { activateFilters, deactivateFilters, applyFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

const filtersForm = document.querySelector('.map__filters');

deactivateFilters();

const activateMap = (data) => {
  setMainPinMarker();
  createMarkers(data);
  filtersForm.addEventListener('change', () => {
    createMarkers(applyFilters(data));
  });
};

export { initMap, activateMap, resetMap, activateFilters };
