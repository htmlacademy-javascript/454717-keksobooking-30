import '../../vendor/nouislider/nouislider.js';
import '../../vendor/nouislider/nouislider.css';

const slider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

noUiSlider.create(slider, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: MIN_PRICE,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

slider.noUiSlider.on('slide', () => {
  inputPrice.value = slider.noUiSlider.get();
  inputPrice.dispatchEvent(new Event('change', {bubbles: true}));
});

const deactivateSlider = () => {
  slider.setAttribute('disabled', true);
};

const activateSlider = () => {
  slider.removeAttribute('disabled');
};

export { deactivateSlider, activateSlider };