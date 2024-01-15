const form = document.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const selects = form.querySelectorAll('select');
const typeFilter = form.querySelector('#housing-type');
const roomsFilter = form.querySelector('#housing-rooms');
const guestsFilter = form.querySelector('#housing-guests');
const priceFilter = form.querySelector('#housing-price');

const PRICE = {
  'any': {min: 0, max: 100000},
  'low': {min: 0, max: 10000},
  'middle': {min: 10000, max: 50000},
  'hight': {min: 50000, max: 100000},
};

const unlockFilters = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  selects.forEach((select) => {
    select.disabled = false;
  });
};

const lockFilters = () => {
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
  .filter((announcement) => typeFilter[0].selected || announcement.offer?.type === typeFilter.value)
  .filter((announcement) => roomsFilter[0].selected || announcement.offer?.rooms === Number(roomsFilter.value))
  .filter((announcement) => guestsFilter[0].selected || announcement.offer?.guests === Number(guestsFilter.value))
  .filter((announcement) => priceFilter[0].selected || (announcement.offer?.price <= PRICE[priceFilter.value].max && announcement.offer?.price > PRICE[priceFilter.value].min))
  .filter((announcement) => filterFeatures(announcement))
  .slice(0, itemLimit);

const resetFilters = () => {
  form.reset();
};

export { unlockFilters, lockFilters, applyFilters, resetFilters };
