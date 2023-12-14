import '../../vendor/pristine/pristine.min.js';

const TITLE_LENGTH = {
  min: 30,
  max: 100
};

const PRICE = {
  max: 100000,
};

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

pristine.addValidator (
  form.title,
  (text) => text.length >= TITLE_LENGTH.min && text.length <= TITLE_LENGTH.max,
  `Требуемая длина сообщения от ${TITLE_LENGTH.min} до ${TITLE_LENGTH.max} символов`
);

pristine.addValidator (
  form.price,
  (number) => number <= PRICE.max,
  `Максимальное значение не должно превышать ${PRICE.max} руб`
);

const checkValidity = () => pristine.validate();
const resetValidity = () => pristine.reset();

export { checkValidity, resetValidity };
