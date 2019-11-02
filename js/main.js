'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var blockForPictures = document.querySelector('.pictures');

  var blockForError = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onError = function (message) {
    errorTemplate.querySelector('.error__title').textContent = message;
    blockForError.appendChild(errorTemplate);
  };

  var onSuccess = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var photo = data[i];
      var el = photoTemplate.cloneNode(true);
      el.querySelector('.picture__img').src = photo.url;
      el.querySelector('.picture__likes').textContent = photo.likes;
      el.querySelector('.picture__comments').textContent = photo.comments.length;
      fragment.appendChild(el);
    }
    blockForPictures.appendChild(fragment);
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
