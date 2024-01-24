import { checkValidity, resetValidity } from './validation.js';
import { activateSlider, deactivateSlider, resetSlider } from './price.js';

const form = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');
const fieldsets = form.querySelectorAll('fieldset');

deactivateSlider();

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  activateSlider();
};

const setSubmitDisabled = (flag) => {
  submitButton.disabled = flag;
  submitButton.textContent = flag ? 'Публикую...' : 'Опубликовать';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity()) {
    new FormData(event.target);
  }
});

const setCoordinates = ({lat, lng}) => {
  form.address.setAttribute('value', `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

const resetUpload = () => {
  resetValidity();
  resetSlider();
};

export { setSubmitDisabled, activateForm, setCoordinates, resetUpload };
