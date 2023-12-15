import '../../vendor/pristine/pristine.min.js';

const TITLE_LENGTH = {
  min: 30,
  max: 100
};

const price = {
  max: 100000,
  min: {
    'flat': 1000,
    'bungalow': 0,
    'house': 5000,
    'palace': 10000,
    'hotel': 3000,
  }
};

const roomСapacity = {
  1:'для 1 гостя',
  2:'для 2 гостей',
  3:'для 3 гостей',
  100:'не для гостей'
};

const REQUIRED_MESSAGE = 'Это обязательное поле';

const form = document.querySelector('.ad-form');

const inputs = form.querySelectorAll('input');

inputs.forEach((input) => {
  if (input.hasAttribute('required')) {
    input.setAttribute('data-pristine-required-message', REQUIRED_MESSAGE);
  }
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

const validateLength = (text) => text.length >= TITLE_LENGTH.min && text.length <= TITLE_LENGTH.max;

pristine.addValidator (
  form.title,
  validateLength,
  `Требуемая длина сообщения от ${TITLE_LENGTH.min} до ${TITLE_LENGTH.max} символов`
);

pristine.addValidator (
  form.price,
  (number) => number <= price.max,
  `Максимальное значение не должно превышать ${price.max} руб`
);

const validatePrice = (value) => {
  const currentType = form.querySelector('[name="type"] :checked');
  return value >= price.min[currentType.value];
};

const getPriceErrorMessage = () => {
  const currentType = form.querySelector('[name="type"] :checked');
  return `Минимальное значение ${price.min[currentType.value]} руб`;
};

pristine.addValidator (
  form.price,
  validatePrice,
  getPriceErrorMessage
);

const validateCapacity = (value) => {
  const currentRoomNumber = form.querySelector('[name="rooms"] [selected]').value;
  console.log(currentRoomNumber);
  return false;
};

const getCapacityErrorMessage = () => {
  console.log('hsfsj');
  return 'Выберите большее количество комнат';
};

pristine.addValidator (
  form.capacity,
  validateCapacity,
  getCapacityErrorMessage
);

form.addEventListener('change', (event) => {
  const currentType = form.querySelector('[name="type"] :checked');
  switch (event.target.name) {
    case 'type':
      form.price.placeholder = price.min[currentType.value];
      pristine.validate(form.price);
      break;
    case 'rooms':
      pristine.validate(form.capacity);
      break;
  }
});

const checkValidity = () => pristine.validate();
const resetValidity = () => pristine.reset();

export { checkValidity, resetValidity };
