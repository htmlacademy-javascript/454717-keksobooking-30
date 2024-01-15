import '../../vendor/pristine/pristine.min.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

const photoConfig = {
  defaultSrc: 'img/muffin-grey.svg',
  size: '70',
};

const titleLength = {
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

const messages = {
  required: 'Это обязательное поле',
  capacity: 'Количество комнат не соответствует количеству гостей',
  photo: 'Некорректный формат изображения'
};

const form = document.querySelector('.ad-form');
const inputs = form.querySelectorAll('input');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const photoPreviewContainer = form.querySelector('.ad-form__photo');

inputs.forEach((input) => {
  if (input.hasAttribute('required')) {
    input.setAttribute('data-pristine-required-message', messages.required);
  }
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__validator',
  errorTextParent: 'ad-form__validator',
  errorClass: 'ad-form__element--invalid',
});

const validatePhoto = (file) => {
  if (!file) {
    return true;
  }
  file = file.toLowerCase();
  return FILE_TYPES.some((type) => file.endsWith(type));
};

pristine.addValidator (
  form.avatar,
  validatePhoto,
  messages.photo
);

pristine.addValidator (
  form.images,
  validatePhoto,
  messages.photo
);

const validateLength = (text) => text.length >= titleLength.min && text.length <= titleLength.max;

pristine.addValidator (
  form.title,
  validateLength,
  `Требуемая длина сообщения от ${titleLength.min} до ${titleLength.max} символов`
);

pristine.addValidator (
  form.price,
  (number) => number <= price.max,
  `Максимальное значение не должно превышать ${price.max} руб`
);

const validatePrice = (value) => value >= price.min[form.type.value];

const getPriceErrorMessage = () => {
  const currentType = form.querySelector('[name="type"] :checked');
  return `Минимальное значение ${price.min[currentType.value]} руб`;
};

pristine.addValidator (
  form.price,
  validatePrice,
  getPriceErrorMessage
);

const isNumberOfRoomsFits = (numberOfRooms, numberOfGuests, notForGuestsNumber = 100) => {
  numberOfRooms = Number(numberOfRooms);
  numberOfGuests = Number(numberOfGuests);
  const isNumberOfGuestsFits = numberOfRooms >= notForGuestsNumber
    ? numberOfGuests === 0
    : numberOfGuests <= numberOfRooms;
  return numberOfGuests === 0
    ? numberOfRooms >= notForGuestsNumber
    : isNumberOfGuestsFits;
};

pristine.addValidator (
  form.capacity,
  (numberOfGuests) => isNumberOfRoomsFits(form.rooms.value, numberOfGuests),
  messages.capacity
);

pristine.addValidator (
  form.rooms,
  (numberOfRooms) => isNumberOfRoomsFits(numberOfRooms, form.capacity.value),
  messages.capacity
);

const synchronizeTime = (selectNameFirst, selectNameSecond) => {
  form[selectNameFirst].value = form[selectNameSecond].value;
};

const renderPreview = (file, preview) => {
  if (file?.type.startsWith('image')) {
    preview.src = URL.createObjectURL(file);
  }
};

const createImage = () => {
  photoPreviewContainer.innerHTML = '';
  const photoPreview = document.createElement('img');
  photoPreview.width = photoConfig.size;
  photoPreview.height = photoConfig.size;
  photoPreviewContainer.appendChild(photoPreview);
  return photoPreview;
};

const resetImages = () => {
  photoPreviewContainer.innerHTML = '';
  avatarPreview.src = photoConfig.defaultSrc;
};

form.addEventListener('change', (event) => {
  switch (event.target.name) {
    case 'avatar':
      pristine.validate(form.avatar);
      renderPreview(event.target.files[0], avatarPreview);
      break;
    case 'type':
      form.price.placeholder = price.min[event.target.value];
      pristine.validate(form.price);
      break;
    case 'rooms':
      pristine.validate(form.capacity);
      break;
    case 'capacity':
      pristine.validate(form.rooms);
      break;
    case 'price':
      pristine.validate(form.price);
      break;
    case 'timein':
      synchronizeTime('timeout', 'timein');
      break;
    case 'timeout':
      synchronizeTime('timein', 'timeout');
      break;
    case 'images':
      renderPreview(event.target.files[0], createImage());
      pristine.validate(form.images);
      break;
  }
});

const checkValidity = () => pristine.validate();

const resetValidity = () => {
  form.price.placeholder = price.min['flat'];
  resetImages();
  pristine.reset();
};

export { checkValidity, resetValidity };
