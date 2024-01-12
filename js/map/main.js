import { activateFilters, deactivateFilters, applyFilters, resetFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

const ANNOUNCEMENTS_LIMIT = 10;
const filtersForm = document.querySelector('.map__filters');

deactivateFilters();

const activateMap = (announcements, reduceFrequency) => {
  setMainPinMarker();
  createMarkers(announcements.slice(0, ANNOUNCEMENTS_LIMIT));
  filtersForm.addEventListener('change', reduceFrequency(() => {
    createMarkers(applyFilters(announcements, ANNOUNCEMENTS_LIMIT));
  }));
};

const resetMapWithFilters = (announcements) => {
  if (announcements) {
    createMarkers(announcements.slice(0, ANNOUNCEMENTS_LIMIT));
  }
  resetMap();
  resetFilters();
};

export { initMap, activateMap, resetMapWithFilters, activateFilters };
