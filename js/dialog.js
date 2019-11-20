'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var Message = {
    START_POSITION: 'Хэш-тег начинается с символа #',
    MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    SPACE: 'Хэш-теги разделяются пробелами',
    NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    MAX_COUNT: 'Нельзя указать больше 5 хэш-тегов',
    MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  };

  var startPosition = 0;
  var minLenght = 2;
  var maxLenght = 20;
  var space = 1;
  var maxCount = 5;

  var setup = document.getElementById('upload-file');
  var changeImg = document.querySelector('.img-upload__overlay');
  var closeChangeImgBtn = document.getElementById('upload-cancel');

  var prewiev = window.util.resizableImg.querySelector('.img-upload__preview img');

  var form = document.querySelector('.img-upload__form');

  var blockSuccess = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var closeBtnSuccess = document.querySelector('#success').content.querySelector('.success__button');
  var closeBtnError = document.querySelector('#error').content.querySelector('.error__button');
  var blockForError = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var nameForm = document.querySelector('.text__description');
  var nameHashtags = document.querySelector('.text__hashtags');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');

  window.hiddenClassAdd = hiddenClassAdd();

  function onChangeImgEscPress(evt) {
    if (nameForm === document.activeElement || nameHashtags === document.activeElement) {
      return evt;
    }
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeChangeImg();
    }
    return false;
  }

  function resetAllEffects() {
    window.util.resizableImg.removeAttribute('style');
    document.querySelector('#effect-heat').removeEventListener('click', window.setupUploadImg.getHeatEffect);
    document.querySelector('#effect-heat').removeAttribute('checked', '');
    document.removeEventListener('click', removeSuccessTemplate);
    document.removeEventListener('keydown', closeSuccessMessage);
    setup.value = '';
    window.util.resizableImg.className = 'img-upload__preview effect__preview--none';
    window.util.resizableImg.style.filter = '';
    document.querySelector('.img-upload__effect-level').className = 'img-upload__effect-level effect-level hidden';
    prewiev.src = 'img/upload-default-image.jpg';
    document.querySelector('.text__hashtags').value = '';
    nameForm.value = '';
    nameHashtags.removeEventListener('keydown', function () {
      nameHashtags.setCustomValidity('');
    });
  }

  function closeSuccessMessage(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      successTemplate.remove();
    }
  }

  function closeErrorMessage(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      errorTemplate.remove();
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
    window.util.fieldEffectLevel.classList.add('hidden');
  }

  function removeSuccessTemplate() {
    successTemplate.remove();
  }

  function addChangeEffects() {
    var file = setup.files[0];
    var fileName = file.name.toLowerCase();
    if (!setup.files.length) {
      return;
    }

    window.util.originalEffect.setAttribute('checked', '');
    window.util.originalEffect.focus();

    openChangeImg();
    hiddenClassAdd();
    document.querySelector('.scale__control--value').value = '100%';
    document.querySelector('.effect-level__value').value = 100;

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        prewiev.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  setup.addEventListener('change', addChangeEffects);

  closeChangeImgBtn.addEventListener('click', function () {
    closeChangeImg();
    window.util.resizableImg.removeAttribute('style');
  });

  function onSuccessUpload() {
    changeImg.classList.add('hidden');
    resetAllEffects();
    blockSuccess.appendChild(successTemplate);
    document.addEventListener('click', removeSuccessTemplate);
    document.addEventListener('keydown', closeSuccessMessage);
    closeBtnSuccess.focus();
    closeBtnSuccess.addEventListener('keydown', closeSuccessMessage);
  }

  function onErrorUpload(message) {
    changeImg.classList.add('hidden');
    errorTemplate.querySelector('.error__title').textContent = message;
    blockForError.appendChild(errorTemplate);
    document.addEventListener('click', function () {
      errorTemplate.remove();
    });
    document.addEventListener('keydown', closeErrorMessage);
    closeBtnError.focus();
    closeBtnError.addEventListener('keydown', closeErrorMessage);
  }

  function validateHashtag(hashtags) {
    if (hashtags[startPosition] !== '#') {
      nameHashtags.setCustomValidity(Message.START_POSITION);
      return false;
    }
    if (hashtags.length < minLenght) {
      nameHashtags.setCustomValidity(Message.MIN_LENGTH);
      return false;
    }
    if (hashtags.length > maxLenght) {
      nameHashtags.setCustomValidity(Message.MAX_LENGTH);
      return false;
    }
    if (hashtags.indexOf('#', space) > 0) {
      nameHashtags.setCustomValidity(Message.SPACE);
      return false;
    }
    return true;
  }

  function onSubmitClick() {
    if (nameHashtags.value !== '') {
      var hashtags = nameHashtags.value.toLowerCase().split(' ');

      for (var i = 0; i < hashtags.length; i++) {
        var isValid = validateHashtag(hashtags[i]);

        if (!isValid) {
          break;
        }
        var nextHashtagSymbol = i + 1;

        if (hashtags.indexOf(hashtags[i], nextHashtagSymbol) > 0) {
          nameHashtags.setCustomValidity(Message.NO_REPEAT);
          break;
        }
      }

      if (hashtags.length > maxCount) {
        nameHashtags.setCustomValidity(Message.MAX_COUNT);
      }
    }
  }

  imgUploadSubmit.addEventListener('click', onSubmitClick);

  nameHashtags.addEventListener('keydown', function () {
    nameHashtags.setCustomValidity('');
  });


  form.addEventListener('submit', function (evt) {
    window.upload('https://js.dump.academy/kekstagram', new FormData(form), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  });
})();
