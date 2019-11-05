'use strict';

(function () {
  var picturesListElement = document.querySelector('.pictures');
  var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');

  var createPicturesItem = function (picture) {
    var picturesItem = picturesItemElement.cloneNode(true);
    picturesItem.querySelector('.picture__img').src = picture.url;
    picturesItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;
    return picturesItem;
  };

  var createPicturesList = window.debounceJS.debounce(function (pictureData) {
    var picturesList = document.createDocumentFragment();
    for (var i = 0; i < pictureData.length; i++) {
      picturesList.appendChild(createPicturesItem(pictureData[i]));
    }
    picturesListElement.appendChild(picturesList);
  });

  window.createPicture = {
    picturesList: createPicturesList
  };
})();
