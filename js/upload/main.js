import { activateForm, deactivateForm } from './activation';
import { checkValidity, resetValidity } from './validation';

const form = document.querySelector('.ad-form');
// const submitButton = document.querySelector('ad-form__submit');

// const setSubmitDisabled = (flag) => {
//   submitButton.disabled = flag;
//   submitButton.textContent = flag ? 'Публикую...' : 'Опубликовать';
// };

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity()) {
    // setSubmitDisabled(true);
    console.log('Отправить форму');
  }
});

form.addEventListener('reset', () => {
  resetValidity();
});

deactivateForm();

export { activateForm };
