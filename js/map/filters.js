const form = document.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const selects = form.querySelectorAll('select');
const filterType = form.querySelector('#housing-type');
const filterRooms = form.querySelector('#housing-rooms');
const filterGuests = form.querySelector('#housing-guests');
const filterPrice = form.querySelector('#housing-price');

const PRICE = {
  'any': {min: 0, max: 100000},
  'low': {min: 0, max: 10000},
  'middle': {min: 10000, max: 50000},
  'hight': {min: 50000, max: 100000},
};

const activateFilters = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  selects.forEach((select) => {
    select.disabled = false;
  });
};

const deactivateFilters = () => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  selects.forEach((select) => {
    select.disabled = true;
  });
};

const filterFeatures = (announcement) => {
  const selectedFeatures = Array.from(form.querySelectorAll('input[name ="features"]:checked'), (input) => input.value);
  return selectedFeatures.every((feature) => announcement.offer.features?.includes(feature));
};

const applyFilters = (announcements, itemLimit) => announcements
  .filter((announcement) => filterType[0].selected || announcement.offer?.type === filterType.value)
  .filter((announcement) => filterRooms[0].selected || announcement.offer?.rooms === Number(filterRooms.value))
  .filter((announcement) => filterGuests[0].selected || announcement.offer?.guests === Number(filterGuests.value))
  .filter((announcement) => filterPrice[0].selected || (announcement.offer?.price <= PRICE[filterPrice.value].max && announcement.offer?.price > PRICE[filterPrice.value].min))
  .filter((announcement) => filterFeatures(announcement))
  .slice(0, itemLimit);

export { activateFilters, deactivateFilters, applyFilters };
