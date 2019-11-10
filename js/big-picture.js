'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  function showBigPicture(picture) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');

    bigPictureCancel.addEventListener('click', closingBigPicture);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closingBigPicture();
      }
    });
  }

  function closingBigPicture() {
    bigPicture.classList.add('hidden');
  }

  window.bigPicture = {
    showBigPicture: showBigPicture
  };

})();
