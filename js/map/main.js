import { activateFilters, deactivateFilters } from './filters.js';
import { initMap, createMarkers, setMainPinMarker, resetMap } from './map.js';

deactivateFilters();

const activateMap = (data) => {
  activateFilters();
  setMainPinMarker();
  createMarkers(data);
};

export { initMap, activateMap, resetMap };
