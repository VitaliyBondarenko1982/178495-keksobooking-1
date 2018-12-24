'use strict';

(function () {

  var lastTimeout;

  window.utils = {
    NUMBER_PINS: 5,
    DEBOUNCE_INTERVAL: 500,

    debounce: function (fun) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(fun, window.utils.DEBOUNCE_INTERVAL);
    },


    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.map.ENTER_KEYCODE) {
        action();
      }
    },

    // Perform an action on Esc keyboard event
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        action();
      }
    },

    removeElement: function (element) {
      element.remove();
      return element;
    },

    hideElementDisplayNone: function (element) {
      element.style.display = 'none';
      return element;
    },

    checkArrayContainsElement: function (array, elementToFind) {
      return array.includes(elementToFind);
    }
  };
})();
