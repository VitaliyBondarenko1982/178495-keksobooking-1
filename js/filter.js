'use strict';


(function () {

  var MIN_MIDDLE_PRICE = 10000;
  var MAX_MIDDLE_PRICE = 50000;

  var changeType = function (it) {
    var housingType = window.mapFilter.querySelector('#housing-type');
    switch (housingType.value) {
      case 'any':
        return it;
      default:
        return it.offer.type === housingType.value;
    }
  };

  var changePrice = function (it) {
    var housingPrice = window.mapFilter.querySelector('#housing-price');

    switch (housingPrice.value) {
      case 'low':
        return it.offer.price <= MIN_MIDDLE_PRICE;
      case 'middle':
        return it.offer.price >= MIN_MIDDLE_PRICE && it.offer.price <= MAX_MIDDLE_PRICE;
      case 'high':
        return it.offer.price >= MAX_MIDDLE_PRICE;
      default:
        return it;
    }
  };

  var changeRooms = function (it) {
    var housingRooms = window.mapFilter.querySelector('#housing-rooms');

    switch (housingRooms.value) {
      case 'any':
        return it;
      default:
        return it.offer.rooms === parseInt(housingRooms.value, 10);
    }
  };

  var changeGuests = function (it) {
    var housingGuests = window.mapFilter.querySelector('#housing-guests');

    switch (housingGuests.value) {
      case 'any':
        return it;
      default:
        return it.offer.guests === parseInt(housingGuests.value, 10);
    }
  };

  var changeFeatures = function (it) {
    var housingFeatures = window.mapFilter.querySelectorAll('.map__checkbox');

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && it.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  window.filteredAds = function () {
    var newAdsArr = window.ads.slice();
    var sameAds = newAdsArr.filter(changeType).filter(changePrice).filter(changeRooms).filter(changeGuests).filter(changeFeatures);
    var pins = document.querySelectorAll('.user__pin');
    pins.forEach(function (node) {
      node.parentNode.removeChild(node);
    });
    window.elementCard.classList.add('hidden');
    window.map.renderPins(sameAds, 5);
  };

  window.filterChangeHandler = function () {
    window.utils.debounce(window.filteredAds, window.utils.DEBOUNCE_INTERVAL);
  };

  window.mapFilter.addEventListener('change', window.filterChangeHandler);

})();
