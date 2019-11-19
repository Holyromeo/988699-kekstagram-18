'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var fieldEffectLevel = document.querySelector('.effect-level');
  var originalEffect = document.getElementById('effect-none');
  var resizableImg = document.querySelector('.img-upload__preview');

  var hiddenClassAdd = function () {
    fieldEffectLevel.classList.add('hidden');
  };

  window.util = {
    hiddenClassAdd: hiddenClassAdd,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    fieldEffectLevel: fieldEffectLevel,
    originalEffect: originalEffect,
    resizableImg: resizableImg
  };
})();
