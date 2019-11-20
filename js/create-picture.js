'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var picturesItemCloningElement = document.querySelector('#picture').content.querySelector('.picture');

  var createPicturesItem = function (picture) {
    var picturesItem = picturesItemCloningElement.cloneNode(true);
    picturesItem.querySelector('.picture__img').src = picture.url;
    picturesItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesItem.addEventListener('click', function () {
      window.BigPicture.bigPicture(picture);
    });

    return picturesItem;
  };

  var createPicturesList = window.debounceJS.debounce(function (pictureData) {
    var picturesListEl = document.createDocumentFragment();
    if (pictureData) {
      for (var i = 0; i < pictureData.length; i++) {
        picturesListEl.appendChild(createPicturesItem(pictureData[i]));
      }
    }
    picturesList.appendChild(picturesListEl);
  });

  window.createPicture = {
    picturesList: createPicturesList
  };
})();
