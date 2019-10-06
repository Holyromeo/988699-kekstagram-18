'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Передо мной интересная фотография.',
  'Давайте рассмотрим изображение внимательнее.',
  'Мне понравилась эта фотография, потому что она четко передает чувства и эмоции присутствующих на ней.'
];

var AUTHORS = ['Иван', 'Хуан', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

document.querySelector('.pictures__title').classList.remove('visually-hidden');

var similarListElement = document.querySelector('.pictures');

var picture = document.querySelector('#picture').content;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAttribute(randomArr) {
  return randomArr[Math.floor(Math.random() * randomArr.length)];
}

function getPhotoNotice(number) {
  return {
    url: 'photos/' + number + '.jpg',
    description: getRandomAttribute(DESCRIPTION),
    likes: getRandomInRange(15, 200),
    comments: getRandomAttribute(COMMENTS)
  };
}

function getPhotoDescription() {
  var photoDescriptionArr = [];
  for (var k = 0; k < 25; k++) {
    photoDescriptionArr.push(getPhotoNotice(k + 1));
  }
  return photoDescriptionArr;
}

var newPhotoDescription = getPhotoDescription();

function photoWithReviews(photoDescription) {
  var photoElement = picture.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoDescription.url;
  photoElement.querySelector('.picture__likes').textContent = photoDescription.likes;
  photoElement.querySelector('.picture__comments').textContent = photoDescription.comments.length;
  return photoElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < newPhotoDescription.length; i++) {
  fragment.appendChild(photoWithReviews(newPhotoDescription[i]));
}

similarListElement.appendChild(fragment);
