const form = document.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const selects = form.querySelectorAll('select');

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

export { activateFilters, deactivateFilters };
