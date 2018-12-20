'use strict';

(function () {
  window.form = {
    adForm: document.querySelector('.ad-form')
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.adForm), window.messages.onLoad, window.messages.onError);
    evt.preventDefault();
  });

  // reset form handler
  var resetForm = document.querySelector('.ad-form__reset');

  resetForm.addEventListener('click', function () {
    window.map.getDeactivePage();
  });
  // reset form handler

  // synchronization fields "timein" and "timeout"
  var selectTimeIn = window.form.adForm.querySelector('#timein');
  var selectTimeOut = window.form.adForm.querySelector('#timeout');

  var synchronizeCheckInOut = function (evt) {
    var val = evt.target.value;
    selectTimeIn.querySelector('option[value="' + val + '"]').selected = true;
    selectTimeOut.querySelector('option[value="' + val + '"]').selected = true;
  };

  var timeInChangeHandler = function (evt) {
    synchronizeCheckInOut(evt);
  };

  var timeOutChangeHandler = function (evt) {
    synchronizeCheckInOut(evt);
  };

  selectTimeIn.addEventListener('change', timeInChangeHandler);
  selectTimeOut.addEventListener('change', timeOutChangeHandler);
  // synchronization fields "timein" and "timeout"


  // synchronization fields "tipe" and "price"
  var selectType = window.form.adForm.querySelector('#type');
  var selectPrice = window.form.adForm.querySelector('#price');
  selectPrice.placeholder = '0';
  selectType.children[0].removeAttribute('selected');
  selectType.children[1].setAttribute('selected', 'selected');
  var changeMinPrice = function (minPrice) {
    selectPrice.placeholder = minPrice;
    selectPrice.min = minPrice;
  };

  var typePriceChangeHandler = function () {
    if (selectType.children[0].selected) {
      changeMinPrice('0');
    } else if (selectType.children[1].selected) {
      changeMinPrice('1000');
    } else if (selectType.children[2].selected) {
      changeMinPrice('5000');
    } else if (selectType.children[3].selected) {
      changeMinPrice('10000');
    }
  };

  selectType.addEventListener('change', typePriceChangeHandler);
  // synchronization fields "tipe" and "price"


  // synchronization fields "room number" and "capacity"
  var adFormRooms = window.form.adForm.elements.rooms;
  var adFormCapacity = window.form.adForm.elements.capacity;

  var syncRoomAndCapacity = function () {
    var selectRoom = parseInt(adFormRooms.value, 10);
    var selectCapacity = parseInt(adFormCapacity.value, 10);
    if (selectRoom === 1 && selectCapacity !== 1) {
      adFormCapacity.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (selectRoom === 2 && (selectCapacity === 0 || selectCapacity === 3)) {
      adFormCapacity.setCustomValidity(
          '2 комнаты — для 1 или 2 гостей'
      );
    } else if (selectRoom === 3 && selectCapacity === 0) {
      adFormCapacity.setCustomValidity(
          '3 комнаты — «для 1-го, 2-x или 3-x гостей»'
      );
    } else if (selectRoom === 100 && selectCapacity !== 0) {
      adFormCapacity.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      adFormCapacity.setCustomValidity('');
    }
  };

  var changeRoomsAndCapacity = function () {
    adFormRooms.addEventListener('change', syncRoomAndCapacity);
    adFormCapacity.addEventListener('change', syncRoomAndCapacity);
  };
  syncRoomAndCapacity();
  changeRoomsAndCapacity();
  // synchronization fields "room number" and "capacity"

})();
