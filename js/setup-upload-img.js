'use strict';

(function () {
  var smallerSizeImgBtn = document.querySelector('.scale__control--smaller');
  var biggerSizeImgBtn = document.querySelector('.scale__control--bigger');
  var valueSizeImg = document.querySelector('.scale__control--value');
  var resizableImg = document.querySelector('.img-upload__preview');
  var resizeStep = '25%';
  var fieldEffectLevel = document.querySelector('.effect-level');

  var originalEffect = document.getElementById('effect-none');
  var chromeEffect = document.getElementById('effect-chrome');
  var sepiaEffect = document.getElementById('effect-sepia');
  var marvinEffect = document.getElementById('effect-marvin');
  var phobosEffect = document.getElementById('effect-phobos');
  var heatEffect = document.getElementById('effect-heat');

  var setup = document.querySelector('.effect-level__pin');
  var scaleValue = document.querySelector('.effect-level__depth');
  var filterDefaultValue = 100;
  var overallLength = document.querySelector('.effect-level__line');

  var spinEffect = {
    chrome: {
      cssFilter: 'grayscale',
      minValue: 0,
      maxValue: 1,
      measureUnit: ''
    },
    sepia: {
      cssFilter: 'sepia',
      minValue: 0,
      maxValue: 1,
      measureUnit: ''
    },
    marvin: {
      cssFilter: 'invert',
      minValue: 0,
      maxValue: 100,
      measureUnit: '%'
    },
    phobos: {
      cssFilter: 'blur',
      minValue: 0,
      maxValue: 3,
      measureUnit: 'px'
    },
    heat: {
      cssFilter: 'brightness',
      minValue: 1,
      maxValue: 3,
      measureUnit: ''
    }
  };

  function hiddenClassAdd() {
    fieldEffectLevel.classList.add('hidden');
  }

  function hiddenClassRemove() {
    fieldEffectLevel.classList.remove('hidden');
  }

  function inRange(someValue, a, b) {
    return someValue >= a && someValue <= b;
  }

  function downsizingImg(someValue) {
    return parseInt(someValue, 10) - parseInt(resizeStep, 10);
  }

  function upsizingImg(someValue) {
    return parseInt(someValue, 10) + parseInt(resizeStep, 10);
  }

  smallerSizeImgBtn.addEventListener('click', function () {
    if (inRange(parseInt(valueSizeImg.value, 10), 50, 100)) {
      valueSizeImg.value = parseInt(downsizingImg(valueSizeImg.value), 10) + '%';
      resizableImg.style.transform = 'scale(' + parseInt(valueSizeImg.value, 10) / 100 + ')';
    }
  });

  biggerSizeImgBtn.addEventListener('click', function () {
    if (inRange(parseInt(valueSizeImg.value, 10), 25, 75)) {
      valueSizeImg.value = parseInt(upsizingImg(valueSizeImg.value), 10) + '%';
      resizableImg.style.transform = 'scale(' + parseInt(valueSizeImg.value, 10) / 100 + ')';
    }
  });

  function removeChecked() {
    originalEffect.removeAttribute('checked', '');
    chromeEffect.removeAttribute('checked', '');
    sepiaEffect.removeAttribute('checked', '');
    marvinEffect.removeAttribute('checked', '');
    phobosEffect.removeAttribute('checked', '');
    heatEffect.removeAttribute('checked', '');
  }

  function replaceEffect(effect) {
    resizableImg.className = 'img-upload__preview ' + effect;
  }

  function startPositionPin() {
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
    resizableImg.removeAttribute('style');
  }

  function getSaturation(effect) {
    var pinValue = parseInt(scaleValue.style.width, 10);
    return 'filter: ' + effect.cssFilter + '(' + pinValue * (effect.maxValue - effect.minValue) / 453 + effect.measureUnit + ')';
  }

  originalEffect.addEventListener('click', function () {
    hiddenClassAdd();
    replaceEffect('effects__preview--none');
    removeChecked();
    originalEffect.setAttribute('checked', '');
    resizableImg.removeAttribute('style');
  });

  chromeEffect.addEventListener('click', function () {
    hiddenClassRemove();
    replaceEffect('effects__preview--chrome');
    removeChecked();
    chromeEffect.setAttribute('checked', '');
    startPositionPin();
  });

  sepiaEffect.addEventListener('click', function () {
    hiddenClassRemove();
    replaceEffect('effects__preview--sepia');
    removeChecked();
    sepiaEffect.setAttribute('checked', '');
    startPositionPin();
  });

  marvinEffect.addEventListener('click', function () {
    hiddenClassRemove();
    replaceEffect('effects__preview--marvin');
    removeChecked();
    marvinEffect.setAttribute('checked', '');
    startPositionPin();
  });

  phobosEffect.addEventListener('click', function () {
    hiddenClassRemove();
    replaceEffect('effects__preview--phobos');
    removeChecked();
    phobosEffect.setAttribute('checked', '');
    startPositionPin();
  });

  heatEffect.addEventListener('click', function () {
    hiddenClassRemove();
    replaceEffect('effects__preview--heat');
    removeChecked();
    heatEffect.setAttribute('checked', '');
    startPositionPin();
  });

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

      if (chromeEffect.checked) {
        resizableImg.style = getSaturation(spinEffect.chrome);
      }
      if (sepiaEffect.checked) {
        resizableImg.style = getSaturation(spinEffect.sepia);
      }
      if (marvinEffect.checked) {
        resizableImg.style = getSaturation(spinEffect.marvin);
      }
      if (phobosEffect.checked) {
        resizableImg.style = getSaturation(spinEffect.phobos);
      }
      if (heatEffect.checked) {
        resizableImg.style = getSaturation(spinEffect.heat);
      }
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
