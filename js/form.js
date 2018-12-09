'use strict';

(function () {
  // add disabled attribute to form fields when page is not active

  var adForm = document.querySelector('.ad-form');
  var fieldsetElements = adForm.getElementsByTagName('fieldset');
  var fieldsetElem;
  for (var k = 0; k < fieldsetElements.length; k++) {
    fieldsetElem = fieldsetElements[k];
    fieldsetElem.setAttribute('disabled', 'disabled');
  }
  // add disabled attribute to form fields when page is not active

  // synchronization fields "timein" and "timeout"

  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

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

  var selectType = adForm.querySelector('#type');
  var selectPrice = adForm.querySelector('#price');
  selectPrice.placeholder = '0';
  selectType.children[0].removeAttribute('selected');
  selectType.children[1].setAttribute('selected', 'selected');
  var changeMinPrice = function (minPrice) {
    selectPrice.placeholder = minPrice;
    selectPrice.min = minPrice;
  };

  var typePriceChangeHandler = function () {
    if (selectType.children[0].selected) {
      changeMinPrice('1000');
    } else if (selectType.children[1].selected) {
      changeMinPrice('0');
    } else if (selectType.children[2].selected) {
      changeMinPrice('5000');
    } else if (selectType.children[3].selected) {
      changeMinPrice('10000');
    }
  };

  selectType.addEventListener('change', typePriceChangeHandler);

  // synchronization fields "tipe" and "price"


  // synchronization fields "room number" and "capacity"

  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  var changeCapacityDisabled = function (disable0, disable1, disable2, disable3) {
    selectCapacity.children[0].disabled = disable0;
    selectCapacity.children[1].disabled = disable1;
    selectCapacity.children[2].disabled = disable2;
    selectCapacity.children[3].disabled = disable3;
  };

  var changeCapacitySelected = function (select0, select1, select2, select3) {
    selectCapacity.children[0].selected = select0;
    selectCapacity.children[1].selected = select1;
    selectCapacity.children[2].selected = select1;
    selectCapacity.children[3].selected = select3;
  };

  var capacityChangeHandler = function () {
    if (selectRoomNumber.children[0].selected) {
      changeCapacityDisabled(true, true, false, true);
      changeCapacitySelected(false, false, true, false);
    } else if (selectRoomNumber.children[1].selected) {
      changeCapacityDisabled(true, false, false, true);
      changeCapacitySelected(false, true, false, false);
    } else if (selectRoomNumber.children[2].selected) {
      changeCapacityDisabled(false, false, false, true);
      changeCapacitySelected(true, false, false, false);
    } else if (selectRoomNumber.children[3].selected) {
      changeCapacityDisabled(true, true, true, false);
      changeCapacitySelected(false, false, false, true);
    }
  };

  selectRoomNumber.addEventListener('change', capacityChangeHandler);

  // synchronization fields "room number" and "capacity"

  window.adForm = adForm;
  window.fieldsetElem = fieldsetElem;
  window.fieldsetElements = fieldsetElements;
})();
