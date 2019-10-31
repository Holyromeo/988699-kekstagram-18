'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var fieldEffectLevel = document.querySelector('.effect-level');

  function hiddenClassAdd() {
    fieldEffectLevel.classList.add('hidden');
  }

  window.ESC_KEYCODE = ESC_KEYCODE;
  window.ENTER_KEYCODE = ENTER_KEYCODE;
  window.fieldEffectLevel = fieldEffectLevel;
  window.hiddenClassAdd = hiddenClassAdd();
})();
