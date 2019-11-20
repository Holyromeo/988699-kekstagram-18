'use strict';

(function () {
  var smallerSizeImgBtn = document.querySelector('.scale__control--smaller');
  var biggerSizeImgBtn = document.querySelector('.scale__control--bigger');
  var valueSizeImg = document.querySelector('.scale__control--value');
  var RESIZE_STEP = '25%';

  var chromeEffect = document.querySelector('#effect-chrome');
  var sepiaEffect = document.querySelector('#effect-sepia');
  var marvinEffect = document.querySelector('#effect-marvin');
  var phobosEffect = document.querySelector('#effect-phobos');
  var heatEffect = document.querySelector('#effect-heat');

  var setup = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var scaleValue = document.querySelector('.effect-level__depth');
  var filterDefaultValue = 100;
  var overallLength = document.querySelector('.effect-level__line');

  var SpinEffect = {
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
    window.util.fieldEffectLevel.classList.add('hidden');
  }

  function hiddenClassRemove() {
    window.util.fieldEffectLevel.classList.remove('hidden');
  }

  function inRange(someValue, a, b) {
    return someValue >= a && someValue <= b;
  }

  function downsizingImg(someValue) {
    return parseInt(someValue, 10) - parseInt(RESIZE_STEP, 10);
  }

  function upsizingImg(someValue) {
    return parseInt(someValue, 10) + parseInt(RESIZE_STEP, 10);
  }

  smallerSizeImgBtn.addEventListener('click', function () {
    if (inRange(parseInt(valueSizeImg.value, 10), 50, 100)) {
      valueSizeImg.value = parseInt(downsizingImg(valueSizeImg.value), 10) + '%';
      window.util.resizableImg.style.transform = 'scale(' + parseInt(valueSizeImg.value, 10) / 100 + ')';
    }
  });

  biggerSizeImgBtn.addEventListener('click', function () {
    if (inRange(parseInt(valueSizeImg.value, 10), 25, 75)) {
      valueSizeImg.value = parseInt(upsizingImg(valueSizeImg.value), 10) + '%';
      window.util.resizableImg.style.transform = 'scale(' + parseInt(valueSizeImg.value, 10) / 100 + ')';
    }
  });

  function removeChecked() {
    window.util.originalEffect.removeAttribute('checked', '');
    chromeEffect.removeAttribute('checked', '');
    sepiaEffect.removeAttribute('checked', '');
    marvinEffect.removeAttribute('checked', '');
    phobosEffect.removeAttribute('checked', '');
    heatEffect.removeAttribute('checked', '');
  }

  function replaceEffect(effect) {
    window.util.resizableImg.className = 'img-upload__preview ' + effect;
  }

  function startPositionPin() {
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
    effectLevelValue.value = filterDefaultValue;
    window.util.resizableImg.removeAttribute('style');
  }

  function getSaturation(effect) {
    var pinValue = parseInt(scaleValue.style.width, 10);
    return 'filter: ' + effect.cssFilter + '(' + (pinValue * (effect.maxValue - effect.minValue) / 453 + effect.minValue) + effect.measureUnit + ')';
  }

  function getOriginalEffect() {
    hiddenClassAdd();
    replaceEffect('effects__preview--none');
    removeChecked();
    window.util.originalEffect.setAttribute('checked', '');
    scaleValue.style.width = filterDefaultValue + '%';
    effectLevelValue.value = 100;
    window.util.resizableImg.removeAttribute('style');
  }

  function getChromeEffect() {
    hiddenClassRemove();
    replaceEffect('effects__preview--chrome');
    removeChecked();
    chromeEffect.setAttribute('checked', '');
    startPositionPin();
  }

  function getSepiaEffect() {
    hiddenClassRemove();
    replaceEffect('effects__preview--sepia');
    removeChecked();
    sepiaEffect.setAttribute('checked', '');
    startPositionPin();
  }

  function getMarvinEffect() {
    hiddenClassRemove();
    replaceEffect('effects__preview--marvin');
    removeChecked();
    marvinEffect.setAttribute('checked', '');
    startPositionPin();
  }

  function getPhobosEffect() {
    hiddenClassRemove();
    replaceEffect('effects__preview--phobos');
    removeChecked();
    phobosEffect.setAttribute('checked', '');
    startPositionPin();
  }

  function getHeatEffect() {
    hiddenClassRemove();
    replaceEffect('effects__preview--heat');
    removeChecked();
    heatEffect.setAttribute('checked', '');
    startPositionPin();
  }

  window.util.originalEffect.addEventListener('click', getOriginalEffect);

  chromeEffect.addEventListener('click', getChromeEffect);

  sepiaEffect.addEventListener('click', getSepiaEffect);

  marvinEffect.addEventListener('click', getMarvinEffect);

  phobosEffect.addEventListener('click', getPhobosEffect);

  heatEffect.addEventListener('click', getHeatEffect);

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

      function getEffectLevelValue() {
        return parseInt((changePosition / 453) * 100, 10);
      }

      if (chromeEffect.checked) {
        window.util.resizableImg.style = getSaturation(SpinEffect.chrome);
        effectLevelValue.value = getEffectLevelValue();
      } else if (sepiaEffect.checked) {
        window.util.resizableImg.style = getSaturation(SpinEffect.sepia);
        effectLevelValue.value = getEffectLevelValue();
      } else if (marvinEffect.checked) {
        window.util.resizableImg.style = getSaturation(SpinEffect.marvin);
        effectLevelValue.value = getEffectLevelValue();
      } else if (phobosEffect.checked) {
        window.util.resizableImg.style = getSaturation(SpinEffect.phobos);
        effectLevelValue.value = getEffectLevelValue();
      } else if (heatEffect.checked) {
        window.util.resizableImg.style = getSaturation(SpinEffect.heat);
        effectLevelValue.value = getEffectLevelValue();
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

  window.setupUploadImg = {
    removeChecked: removeChecked,
    getOriginalEffect: getOriginalEffect,
    getChromeEffect: getChromeEffect,
    getSepiaEffect: getSepiaEffect,
    getMarvinEffect: getMarvinEffect,
    getPhobosEffect: getPhobosEffect,
    getHeatEffect: getHeatEffect
  };
})();
