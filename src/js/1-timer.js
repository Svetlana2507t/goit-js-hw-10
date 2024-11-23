const d = {
  minDate: 'today',
  maxDate: new Date().fp_incr(14), // 14 days from now
};

console.log('minDate: today', d.minDate);
console.log('maxDate:', d.maxDate);
