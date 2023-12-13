import { renderCard } from './render-card.js';
import { activateFilters, deactivateFilters } from './filters.js';

deactivateFilters();

const renderMap = (data) => {
  renderCard(data[3]);
  activateFilters();
};

export { renderMap };
