import { createAnnouncementsData } from './data';
import { renderMap } from './map/main';
import './upload/main';

renderMap(createAnnouncementsData());
