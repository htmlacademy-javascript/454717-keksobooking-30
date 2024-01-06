const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

form.addEventListener('reset', () => {
  document.dispatchEvent (new Event('formReseted'));
});

export { activateForm, deactivateForm };
