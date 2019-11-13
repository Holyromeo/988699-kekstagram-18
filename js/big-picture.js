'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentItem = document.querySelector('.social__comment');
  var buttonLoadComment = document.querySelector('.comments-loader');
  // var clickPicture = document.querySelector('.picture__img');

  function getCommentItem(comment) {
    var createCommentItem = commentItem.cloneNode(true);
    createCommentItem.querySelector('.social__picture').src = comment.avatar;
    createCommentItem.querySelector('.social__picture').alt = comment.name;
    createCommentItem.querySelector('.social__text').textContent = comment.message;
    return createCommentItem;
  }

  function createSocialCommentsList(comment) {
    var socialCommentsList = document.createDocumentFragment();
    comment.forEach(function (comments) {
      if (socialCommentsList.childNodes.length < 5) {
        socialCommentsList.appendChild(getCommentItem(comments));
      }
      if (socialCommentsList.childNodes.length > 5 || socialCommentsList.childNodes.length < 10) {
        buttonLoadComment.classList.remove('visually-hidden');
      }
    });

    commentsList.innerHTML = '';
    commentsList.appendChild(socialCommentsList);
  }

  function showBigPicture(picture) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.big-picture__img img').alt = 'photo';
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;


    createSocialCommentsList(picture.comments);


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
