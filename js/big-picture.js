'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentItem = document.querySelector('.social__comment');
  var buttonLoadComment = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsCountItem = commentsCount.querySelector('.first');
  var commentsCounter = 5;

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
      socialCommentsList.appendChild(getCommentItem(comments));
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

    function loadComments(count) {
      return picture.comments.slice(0, count);
    }

    createSocialCommentsList(loadComments(commentsCounter));

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
    commentsCount.classList.remove('visually-hidden');
    if (picture.comments.length >= 5) {
      buttonLoadComment.classList.remove('visually-hidden');
    }

    if (picture.comments.length < 5) {
      commentsCountItem.textContent = picture.comments.length + ' из ';
    }

    function addComments() {
      commentsCounter += 5;
      createSocialCommentsList(loadComments(commentsCounter));
      commentsCountItem.textContent = loadComments(commentsCounter).length + ' из ';
      if (loadComments(commentsCounter).length >= picture.comments.length) {
        buttonLoadComment.classList.add('visually-hidden');
      }
    }

    buttonLoadComment.addEventListener('click', addComments);

    function closingBigPicture() {
      bigPicture.classList.add('hidden');
      buttonLoadComment.classList.add('visually-hidden');
      commentsCountItem.textContent = '5 из ';
      commentsCounter = 5;
      buttonLoadComment.removeEventListener('click', addComments);
    }

    bigPictureCancel.addEventListener('click', closingBigPicture);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closingBigPicture();
      }
    });
  }

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
