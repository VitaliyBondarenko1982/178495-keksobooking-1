'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_LEG = 22;
  var MIN_MAIN_PIN_Y = 150;
  var MAX_MAIN_PIN_Y = 500;
  var PHOTO = {
    'width': 70,
    'height': 70
  };

  var fragmentPin;
  var inputAddress = document.getElementById('address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.querySelector('img').width;
  var mainPinHeight = mainPin.querySelector('img').height;
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var fieldsetElements = window.form.adForm.querySelectorAll('.ad-form fieldset');
  var form = document.querySelector('.notice form');
  var fileChooserAvatar = window.form.adForm.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = window.form.adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var fileChooserPhotos = window.form.adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPhotos = window.form.adForm.querySelector('.ad-form__photo');

  // Event handler on avatar change
  var onAvatarChange = function () {
    var file = fileChooserAvatar.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  // Event handler on property photos change
  var onPhotosChange = function () {
    var files = fileChooserPhotos.files;
    [].forEach.call(files, function (el) {
      var imgEl = document.createElement('img');
      imgEl.width = PHOTO.width;
      imgEl.height = PHOTO.height;
      imgEl.alt = 'Property photo';
      previewPhotos.appendChild(imgEl);
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgEl.src = reader.result;
      });
      reader.readAsDataURL(el);
    });
  };

  fileChooserAvatar.addEventListener('change', onAvatarChange);
  fileChooserPhotos.addEventListener('change', onPhotosChange);

  window.map = {
    renderPins: function (data, arr) {
      var pinsArr = data.length >= arr ? arr : data.length;
      fragmentPin = document.createDocumentFragment();
      for (var i = 0; i < pinsArr; i++) {
        fragmentPin.appendChild(window.pin.makePin(data[i]));
      }
      window.map.mapPins.appendChild(fragmentPin);
    },

    // function for deactivate page
    getDeactivePage: function () {
      window.pin.mapElement.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');
      fieldsetElements.forEach(function (item) {
        item.setAttribute('disabled', true);
      });
      form.reset();
      mainPin.addEventListener('mouseup', mainPinFirstMoveHandler);
      var elements = document.querySelectorAll('.user__pin');
      elements.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
      mainPin.style.left = mainPinPosX + 'px';
      mainPin.style.top = mainPinPosY + 'px';
      inputAddress.value = mainPinX + ', ' + mainPinY;
      window.elementCard.classList.add('hidden');
    },
    // function for deactivate page

    mapPins: document.querySelector('.map__pins')
  };

  window.ads = [];

  // activate fieldsets fieldsetElements
  var getActiveFieldsets = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  // activate fieldsets fieldsetElements

  // function for activate page
  var getActivePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    getActiveFieldsets();
    var successLoadHandler = function (data) {
      window.ads = data;
      window.map.renderPins(window.ads, 5);
    };
    window.backend.load(successLoadHandler, window.backend.errorDataHandler);

    mainPin.removeEventListener('mouseup', mainPinFirstMoveHandler);
  };

  var mainPinFirstMoveHandler = function () {
    getActivePage();
  };

  mainPin.addEventListener('mouseup', mainPinFirstMoveHandler);

  // move main pin
  var limitMainPinMove = function (left, top) {
    if ((left < 0) || (top < MIN_MAIN_PIN_Y - mainPinHeight - MAIN_PIN_LEG) || (left + mainPinWidth > mapWidth) || (top + mainPinHeight + MAIN_PIN_LEG > MAX_MAIN_PIN_Y)) {
      return true;
    }
    return false;
  };

  var mainPinPosX = mainPin.offsetLeft;
  var mainPinPosY = mainPin.offsetTop;
  var mainPinX = Math.floor(mainPinPosX + mainPinWidth / 2);
  var mainPinY = Math.floor(mainPinPosY + mainPinHeight / 2);
  inputAddress.value = mainPinX + ', ' + mainPinY;

  window.setCurrentMainPinCoord = function () {
    window.currentMainPinX = Math.floor(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    window.currentMainPinY = Math.floor(parseInt(mainPin.style.top, 10) + mainPinHeight);
    inputAddress.value = window.currentMainPinX + ', ' + (window.currentMainPinY + MAIN_PIN_LEG);
  };


  var mainPinMoveHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (limitMainPinMove(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y)) {
        return;
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      window.setCurrentMainPinCoord();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      mouseMoveHandler(upEvt);
      window.setCurrentMainPinCoord();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };
  mainPin.addEventListener('mousedown', mainPinMoveHandler);
  // move main pin

  // close popup
  var popupClose = document.querySelector('.popup__close');

  window.popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.popupEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var closePopup = function () {
    window.elementCard.classList.add('hidden');
    document.removeEventListener('keydown', window.popupEscPressHandler);
  };

  var openPopup = function () {
    window.elementCard.classList.add('hidden');
    document.addEventListener('keydown', window.popupEscPressHandler);
  };

  popupClose.addEventListener('click', function () {
    closePopup();
  });
  // close popup

  window.fragmentPin = fragmentPin;
  window.inputAddress = inputAddress;
  // window.currentMainPinX = currentMainPinX;
  // window.currentMainPinY = currentMainPinY;
  window.MAIN_PIN_LEG = MAIN_PIN_LEG;
  window.map.ESC_KEYCODE = ESC_KEYCODE;
  window.map.ENTER_KEYCODE = ENTER_KEYCODE;

})();
