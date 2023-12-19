import { renderCard } from './card.js';
import { activateFilters, deactivateFilters } from './filters.js';
import { initMap } from './map.js';

deactivateFilters();

const activateMap = (data) => {
  // renderCard(data[3]);
  activateFilters();
};

export { initMap, activateMap };
