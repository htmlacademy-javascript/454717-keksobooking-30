import { activateFilters, deactivateFilters } from './filters.js';
import { initMap, createMarkers } from './map.js';

deactivateFilters();

const activateMap = (data) => {
  activateFilters();
  createMarkers(data);
};

export { initMap, activateMap };
