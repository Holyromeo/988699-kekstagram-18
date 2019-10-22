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

document.querySelector('.pictures__title').classList.remove('visually-hidden');

var similarListElement = document.querySelector('.pictures');

var picture = document.querySelector('#picture')
  .content;

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

var ESC_KEYCODE = 27;
var setup = document.getElementById('upload-file');
var changeImg = document.querySelector('.img-upload__overlay');
var closeChangeImgBtn = document.getElementById('upload-cancel');

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

setup.addEventListener('change', function () {
  openChangeImg();
  document.querySelector('.scale__control--value').value = '100%';
});

closeChangeImgBtn.addEventListener('click', function () {
  closeChangeImg();
  resizableImg.removeAttribute('style');
});

var smallerSizeImgBtn = document.querySelector('.scale__control--smaller');
var biggerSizeImgBtn = document.querySelector('.scale__control--bigger');
var valueSizeImg = document.querySelector('.scale__control--value');
var resizableImg = document.querySelector('.img-upload__preview');
var resizeStep = '25%';

function inRange(someValue, a, b) {
  return someValue >= a && someValue <= b;
}

function downsizingImg(someValue) {
  if (inRange(parseInt(valueSizeImg.value, 10))) {
    return parseInt(someValue, 10) - parseInt(resizeStep, 10);
  } return false;
}

function upsizingImg(someValue) {
  if (inRange(parseInt(valueSizeImg.value, 10))) {
    return parseInt(someValue, 10) + parseInt(resizeStep, 10);
  } return false;
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
