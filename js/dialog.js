'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var setup = document.getElementById('upload-file');
  var changeImg = document.querySelector('.img-upload__overlay');
  var closeChangeImgBtn = document.getElementById('upload-cancel');
  var fieldEffectLevel = document.querySelector('.effect-level');
  var resizableImg = document.querySelector('.img-upload__preview');

  function onChangeImgEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeChangeImg();
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
})();
