import { activateFilters, deactivateFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker } from './map.js';

deactivateFilters();

const activateMap = (data) => {
  activateFilters();
  setMainPinMarker();
  createMarkers(data);
};

export { initMap, activateMap };
