'use strict';

(function () {
  var smallerSizeImgBtn = document.querySelector('.scale__control--smaller');
  var biggerSizeImgBtn = document.querySelector('.scale__control--bigger');
  var valueSizeImg = document.querySelector('.scale__control--value');
  var resizableImg = document.querySelector('.img-upload__preview');
  var resizeStep = '25%';

  var originalEffect = document.getElementById('effect-none');
  var chromeEffect = document.getElementById('effect-chrome');
  var sepiaEffect = document.getElementById('effect-sepia');
  var marvinEffect = document.getElementById('effect-marvin');
  var phobosEffect = document.getElementById('effect-phobos');
  var heatEffect = document.getElementById('effect-heat');

  var changeImgEffect = document.querySelector('.img-upload__preview');

  var setup = document.querySelector('.effect-level__pin');
  var scaleValue = document.querySelector('.effect-level__depth');
  var filterDefaultValue = 100;

  var fieldEffectLevel = document.querySelector('.effect-level');

  function hiddenClassAdd() {
    fieldEffectLevel.classList.add('hidden');
  }

  function hiddenClassRemove() {
    fieldEffectLevel.classList.remove('hidden');
  }

  window.hiddenClassAdd = hiddenClassAdd();

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

  function addSomeEffect(someClass) {
    changeImgEffect.classList.add(someClass);
  }

  function removeSomeEffect(someClass) {
    changeImgEffect.classList.remove(someClass);
  }

  function removeChecked() {
    originalEffect.removeAttribute('checked', '');
    chromeEffect.removeAttribute('checked', '');
    sepiaEffect.removeAttribute('checked', '');
    marvinEffect.removeAttribute('checked', '');
    phobosEffect.removeAttribute('checked', '');
    heatEffect.removeAttribute('checked', '');
  }

  originalEffect.addEventListener('click', function () {
    hiddenClassAdd();
    removeSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--marvin');
    removeSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--heat');
    removeChecked();
    originalEffect.setAttribute('checked', '');
  });

  chromeEffect.addEventListener('click', function () {
    hiddenClassRemove();
    addSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--marvin');
    removeSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--heat');
    removeChecked();
    chromeEffect.setAttribute('checked', '');
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
  });

  sepiaEffect.addEventListener('click', function () {
    hiddenClassRemove();
    addSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--marvin');
    removeSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--heat');
    removeChecked();
    sepiaEffect.setAttribute('checked', '');
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
  });

  marvinEffect.addEventListener('click', function () {
    hiddenClassRemove();
    addSomeEffect('effects__preview--marvin');
    removeSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--heat');
    removeChecked();
    marvinEffect.setAttribute('checked', '');
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
  });

  phobosEffect.addEventListener('click', function () {
    hiddenClassRemove();
    addSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--marvin');
    removeSomeEffect('effects__preview--heat');
    removeChecked();
    phobosEffect.setAttribute('checked', '');
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
  });

  heatEffect.addEventListener('click', function () {
    hiddenClassRemove();
    addSomeEffect('effects__preview--heat');
    removeSomeEffect('effects__preview--chrome');
    removeSomeEffect('effects__preview--sepia');
    removeSomeEffect('effects__preview--phobos');
    removeSomeEffect('effects__preview--marvin');
    removeChecked();
    heatEffect.setAttribute('checked', '');
    setup.style.left = filterDefaultValue + '%';
    scaleValue.style.width = filterDefaultValue + '%';
  });
})();
