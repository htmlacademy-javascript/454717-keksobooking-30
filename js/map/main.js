import { activateFilters, deactivateFilters, applyFilters, resetFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

const filtersForm = document.querySelector('.map__filters');

deactivateFilters();

const activateMap = (data, reduceFrequency, itemLimit = 10) => {
  setMainPinMarker();
  createMarkers(data.slice(0, itemLimit));
  filtersForm.addEventListener('change', reduceFrequency(() => {
    createMarkers(applyFilters(data, itemLimit));
  }));
};

export { initMap, activateMap, resetMap, activateFilters, resetFilters };
