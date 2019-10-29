'use strict';

(function () {
  var setup = document.querySelector('.effect-level__pin');
  var scaleValue = document.querySelector('.effect-level__depth');
  var overallLength = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');

  setup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    var min = startCoords - scaleValue.getBoundingClientRect().width;
    var maxLength = parseInt(overallLength.getBoundingClientRect().width, 10);
    var max = min + maxLength;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var currentPosition = moveEvt.clientX;

      var changePosition = currentPosition - min;
      if (currentPosition <= min) {
        changePosition = 0;
      }
      if (currentPosition >= max) {
        changePosition = maxLength;
      }

      scaleValue.style.width = changePosition + 'px';
      setup.style.left = changePosition + 'px';

      var scale = scaleValue.getBoundingClientRect().width / overallLength.getBoundingClientRect().width;
      var currentEffect = document.querySelector('.effects__radio:checked').value;

      effectLevelValue(currentEffect, scale);
    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
