'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var setup = document.getElementById('upload-file');
  var changeImg = document.querySelector('.img-upload__overlay');
  var closeChangeImgBtn = document.getElementById('upload-cancel');
  var resizableImg = document.querySelector('.img-upload__preview');
  var fieldEffectLevel = document.querySelector('.effect-level');
  var form = document.querySelector('.img-upload__form');

  var blockSuccess = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var closeBtnSuccess = document.querySelector('#success').content.querySelector('.success__button');
  var blockForError = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  window.ESC_KEYCODE = ESC_KEYCODE;
  window.hiddenClassAdd = hiddenClassAdd();
  window.fieldEffectLevel = fieldEffectLevel;

  function onChangeImgEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeChangeImg();
    }
  }

  function closeSuccessMessge(evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      successTemplate.remove();
    }
  }

  function openChangeImg() {
    changeImg.classList.remove('hidden');
    document.addEventListener('keydown', onChangeImgEscPress);
  }

  function closeChangeImg() {
    changeImg.classList.add('hidden');
    document.getElementById('upload-file').value = '';
  }

  function hiddenClassAdd() {
    fieldEffectLevel.classList.add('hidden');
  }

  setup.addEventListener('change', function () {
    openChangeImg();
    hiddenClassAdd();
    document.querySelector('.scale__control--value').value = '100%';
  });

  closeChangeImgBtn.addEventListener('click', function () {
    closeChangeImg();
    resizableImg.removeAttribute('style');
  });

  function onSuccessUpload() {
    changeImg.classList.add('hidden');
    blockSuccess.appendChild(successTemplate);
    document.addEventListener('click', function () {
      successTemplate.remove();
    });
    document.addEventListener('keydown', closeSuccessMessge);
    closeBtnSuccess.focus();
    closeBtnSuccess.addEventListener('keydown', closeSuccessMessge);
  }

  function onErrorUpload(message) {
    errorTemplate.querySelector('.error__title').textContent = message;
    blockForError.appendChild(errorTemplate);
  }

  form.addEventListener('submit', function (evt) {
    window.upload('https://js.dump.academy/kekstagram', new FormData(form), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  });
})();
