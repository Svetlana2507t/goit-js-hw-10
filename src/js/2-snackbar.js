// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const radio = form.elements['state'];
const delay = form.elements['delay'];
form.addEventListener('submit', onClick);
let promise;
function onClick(event) {
  event.preventDefault();
  let delayMs = delay.value;

  const selectedRadioValue = radio.value;
  console.log('selectedRadioValue', selectedRadioValue);
  iziToast.info({
    title: 'Info',
    message: 'selectedRadioValue' + selectedRadioValue,
  });
  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadioValue === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delayMs}ms`);
      } else {
        reject(`❌ Rejected promise in ${delayMs}ms`);
      }
    }, delayMs);
  });
  promise
    .then(value =>
      iziToast.info({
        title: 'Info',
        message: value,
      })
    ) // "Success! Value passed to resolve function"
    .catch(value =>
      iziToast.error({
        title: 'Error',
        message: value,
      })
    ); // "Error! Error passed to reject function"
}
