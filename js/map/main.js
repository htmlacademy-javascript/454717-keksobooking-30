import { unlockFilters, lockFilters, applyFilters, resetFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

const ANNOUNCEMENTS_LIMIT = 10;
const filtersForm = document.querySelector('.map__filters');

lockFilters();

const activateMap = () => {
  setMainPinMarker();
};

const activateFilters = (announcements, reduceFrequency) => {
  unlockFilters();
  createMarkers(announcements.slice(0, ANNOUNCEMENTS_LIMIT));

  const onFiltersFormChange = reduceFrequency(() => {
    createMarkers(applyFilters(announcements, ANNOUNCEMENTS_LIMIT));
  });
  filtersForm.addEventListener('change', onFiltersFormChange);
};

const resetMapWithFilters = (announcements) => {
  if (announcements) {
    createMarkers(announcements.slice(0, ANNOUNCEMENTS_LIMIT));
  }
  resetMap();
  resetFilters();
};

export { initMap, activateMap, resetMapWithFilters, activateFilters };
