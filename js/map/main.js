import { activateFilters, deactivateFilters, applyFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

const filtersForm = document.querySelector('.map__filters');

deactivateFilters();

const activateMap = (data, itemLimit = 10) => {
  setMainPinMarker();
  createMarkers(data.slice(0, itemLimit));
  filtersForm.addEventListener('change', () => {
    createMarkers(applyFilters(data, itemLimit));
  });
};

export { initMap, activateMap, resetMap, activateFilters };
