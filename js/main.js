'use strict';

(function () {
  var blockForError = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var imgFilters = document.querySelector('.img-filters');
  var popularFilter = document.querySelector('#filter-popular');
  var randomFilter = document.querySelector('#filter-random');
  var discussedFilter = document.querySelector('#filter-discussed');
  var randomPhotos = 10;

  function onSuccess(data) {
    window.pictureData = data.slice();
    window.createPicture.picturesList(window.pictureData);
  }

  function onError(message) {
    errorTemplate.querySelector('.error__title').textContent = message;
    blockForError.appendChild(errorTemplate);
  }

  imgFilters.classList.remove('img-filters--inactive');

  function removeActiveClassButton(element1, element2) {
    element1.classList.remove('img-filters__button--active');
    element2.classList.remove('img-filters__button--active');
    return;
  }

  function addActiveClassButton(element) {
    return element.classList.add('img-filters__button--active');
  }

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);

  function getRandomShuffleArray(pictureData) {
    var copyData = pictureData.slice();
    return copyData.sort(function () {
      return Math.random() - 0.5;
    });
  }

  var clearPictures = window.debounceJS.debounce(function () {
    var allPictures = document.querySelectorAll('.picture');
    if (allPictures.length > 0) {
      for (var i = 0; i < allPictures.length; i++) {
        allPictures[i].remove();
      }
    }
    return window.debounceJS.debounce;
  });

  function removeAndAddPhotos(parametr) {
    clearPictures();
    window.createPicture.picturesList(parametr);
  }

  popularFilter.addEventListener('click', function () {
    removeActiveClassButton(randomFilter, discussedFilter);
    addActiveClassButton(popularFilter);
    removeAndAddPhotos(window.pictureData);
  });
  randomFilter.addEventListener('click', function () {
    removeActiveClassButton(popularFilter, discussedFilter);
    addActiveClassButton(randomFilter);
    removeAndAddPhotos(getRandomShuffleArray(window.pictureData).slice(0, randomPhotos));
  });
  discussedFilter.addEventListener('click', function () {
    removeActiveClassButton(popularFilter, randomFilter);
    addActiveClassButton(discussedFilter);
    removeAndAddPhotos(window.pictureData.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    })
    );
  });
})();
