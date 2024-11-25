// const d = {
//   minDate: 'today',
//   maxDate: new Date().fp_incr(14), // 14 days from now
// };

// console.log('minDate: today', d.minDate);
// console.log('maxDate:', d.maxDate);

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  position: 'topRight',
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(141000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let userSelectedDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() <= new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      //alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const textInput = document.querySelector('#datetime-picker');

textInput.disabled = false;
startBtn.disabled = true;

startBtn.addEventListener('click', onClick);
function onClick(click) {
  textInput.disabled = true;
  startBtn.disabled = true;
  let deltaTime = userSelectedDate.getTime() - new Date().getTime();
  timerId = setInterval(() => {
    //startBtn.disabled = true;
    deltaTime -= 1000;
    if (deltaTime <= 0) {
      clearInterval(timerId);
      textInput.disabled = false;
      //startBtn.disabled = false;
    } else {
      let date = convertMs(deltaTime);
      daysCounter.textContent = addLeadingZero(date.days);
      hoursCounter.textContent = addLeadingZero(date.hours);
      minutesCounter.textContent = addLeadingZero(date.minutes);
      secondsCounter.textContent = addLeadingZero(date.seconds);
    }
  }, 1000);
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  }
  return value;
}
