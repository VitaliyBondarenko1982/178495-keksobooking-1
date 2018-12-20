'use strict';

(function () {
  var pageMain = document.querySelector('main');

  window.messages = {

    // Show success popup
    onLoad: function () {
      // Reset page
      window.map.getDeactivePage();

      // Show success popup
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successPopup = successTemplate.cloneNode(true);
      pageMain.appendChild(successPopup);

      var onSuccessPopupClick = function () {
        window.utils.removeElement(successPopup);
        document.removeEventListener('click', onSuccessPopupClick);
        document.removeEventListener('keydown', onSuccessPopupEscPress);
      };

      var onSuccessPopupEscPress = function (evt) {
        window.utils.isEscEvent(evt, onSuccessPopupClick);
      };

      // Event Handlers to close success popup
      document.addEventListener('click', onSuccessPopupClick);
      document.addEventListener('keydown', onSuccessPopupEscPress);
    },

    // Show error popup
    onError: function (uploadError) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorPopup = errorTemplate.cloneNode(true);
      errorPopup.querySelector('.error__message').textContent = uploadError;
      pageMain.appendChild(errorPopup);

      var onErrorPopupClick = function () {
        window.utils.removeElement(errorPopup);
        document.removeEventListener('click', onErrorPopupClick);
        document.removeEventListener('keydown', onErrorPopupEscPress);
      };

      var onErrorPopupEscPress = function (evt) {
        window.utils.isEscEvent(evt, onErrorPopupClick);
      };

      // Event Handlers to close error popup
      var errorButton = errorPopup.querySelector('.error__button');
      errorButton.addEventListener('click', onErrorPopupClick);
      document.addEventListener('click', onErrorPopupClick);
      document.addEventListener('keydown', onErrorPopupEscPress);
    }
  };
})();
