console.log('test');

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.show({
  title: 'Hey',
  message: 'What would you like to add?',
});
console.log(iziToast.show());
console.log(iziToast);
