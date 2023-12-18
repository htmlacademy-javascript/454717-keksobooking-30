import { activateForm, deactivateForm } from './activation';
import { checkValidity, resetValidity } from './validation';

const form = document.querySelector('.ad-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity()) {
    console.log('Отправить форму');
  }
});

form.addEventListener('reset', () => {
  resetValidity();
});

deactivateForm();
activateForm();

