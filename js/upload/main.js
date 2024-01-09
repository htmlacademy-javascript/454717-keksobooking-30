import { activateForm, deactivateForm } from './form.js';
import { checkValidity, resetValidity } from './validation';
import { activateSlider, deactivateSlider, resetSlider } from './price.js';

deactivateForm();
deactivateSlider();

const form = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

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

form.addEventListener('reset', () => {
  resetValidity();
  resetSlider();
  document.dispatchEvent (new Event('formReset'));
  form.type.dispatchEvent(new Event('change', {bubbles: true}));
});

const resetForm = () => {
  resetButton.click();
};

const setCoordinates = ({lat, lng}) => {
  form.address.setAttribute('value', `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

export { setSubmitDisabled, resetForm, activateForm, activateSlider, setCoordinates };
