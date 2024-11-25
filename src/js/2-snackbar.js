// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  position: 'topRight',
});

const form = document.querySelector('.form');

const radio = form.elements['state'];
const delay = form.elements['delay'];
form.addEventListener('submit', onClick);
let promise;
function onClick(event) {
  event.preventDefault();
  let delayMs = delay.value;

  const selectedRadioValue = radio.value;
  //console.log('selectedRadioValue', selectedRadioValue);
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
      iziToast.success({
        title: 'OK',
        message: value,
      })
    )
    .catch(value =>
      iziToast.error({
        title: 'Error',
        message: value,
      })
    ) // "Error! Error passed to reject function"
    .finally(() => {
      console.log('Promise settled');
      form.reset();
    });
}
