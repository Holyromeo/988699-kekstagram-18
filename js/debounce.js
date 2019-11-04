'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb, interval) {
    interval = typeof interval !== 'undefined' ? interval : DEBOUNCE_INTERVAL;
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };
  window.debounceJS = {
    debounce: debounce
  };
})();
