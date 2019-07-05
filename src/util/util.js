const throttle = (fn, interval) => {
  let tooSoon = false;
  return (...args) => {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => tooSoon = false, interval);
      fn(...args);
    }
  }
};

module.exports = {
  throttle
};