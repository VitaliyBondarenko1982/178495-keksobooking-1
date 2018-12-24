'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  window.elementCard = mapCardTemplate.cloneNode(true);
  window.mapFilter = document.querySelector('.map__filters-container');
  window.mapFilter.before(window.elementCard);
  window.elementCard.classList.add('hidden');

  var transformType = function (type) {
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
    }

    return type;
  };


  window.makeCard = function (dataCard) {
    var fillFeaturesList = function () {
      var featuresList = window.elementCard.querySelector('.popup__features');
      var wifi = featuresList.querySelector('.popup__feature--wifi');
      var dishwasher = featuresList.querySelector('.popup__feature--dishwasher');
      var parking = featuresList.querySelector('.popup__feature--parking');
      var washer = featuresList.querySelector('.popup__feature--washer');
      var elevator = featuresList.querySelector('.popup__feature--elevator');
      var conditioner = featuresList.querySelector('.popup__feature--conditioner');

      var featuresAvailable = dataCard.offer.features;
      var wifiAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'wifi');
      var dishwasherAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'dishwasher');
      var parkingAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'parking');
      var washerAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'washer');
      var elevatorAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'elevator');
      var conditionerAvailable = window.utils.checkArrayContainsElement(featuresAvailable, 'conditioner');

      // Hide section if no features available
      if (featuresAvailable.length === 0) {
        window.utils.hideElementDisplayNone(featuresList);
        return false;
      } else {
        if (!wifiAvailable) {
          window.utils.hideElementDisplayNone(wifi);
        }
        if (!dishwasherAvailable) {
          window.utils.hideElementDisplayNone(dishwasher);
        }
        if (!parkingAvailable) {
          window.utils.hideElementDisplayNone(parking);
        }
        if (!washerAvailable) {
          window.utils.hideElementDisplayNone(washer);
        }
        if (!elevatorAvailable) {
          window.utils.hideElementDisplayNone(elevator);
        }
        if (!conditionerAvailable) {
          window.utils.hideElementDisplayNone(conditioner);
        }
      }
      return featuresList;
    };

    // Add description if available
    var addDescription = function () {
      var description = window.elementCard.querySelector('.popup__description');
      if (description.textContent === '') {
        window.utils.hideElementDisplayNone(description);
      }
      description.textContent = dataCard.offer.description;
      return description;
    };

    var fillPhotoGallery = function () {
      var elementPhotos = window.elementCard.querySelector('.popup__photos');
      var photosAvailable = dataCard.offer.photos;

      // Hide section if no photos available, render photos otherwise
      if (photosAvailable.length === 0) {
        window.utils.hideElementDisplayNone(elementPhotos);
        return false;
      } else {
        var templatePhoto = window.elementCard.querySelector('.popup__photo');
        var elementPhoto = elementPhotos.removeChild(templatePhoto);
        elementPhotos.innerHTML = '';

        for (var j = 0; j < offer.photos.length; j++) {
          var currentPhoto = elementPhoto.cloneNode(true);
          currentPhoto.src = offer.photos[j];
          elementPhotos.appendChild(currentPhoto);
        }

        return elementPhotos;
      }
    };

    var offer = dataCard.offer;
    window.elementCard.querySelector('.popup__title').textContent = offer.title;
    window.elementCard.querySelector('.popup__text--address').textContent = offer.address;
    window.elementCard.querySelector('.popup__text--price ').textContent = offer.price + '₽/ночь';
    window.elementCard.querySelector('.popup__type').textContent = transformType(offer.type);
    window.elementCard.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    window.elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    fillFeaturesList();
    addDescription();
    fillPhotoGallery();

    window.elementCard.querySelector('.popup__avatar').src = dataCard.author.avatar;
    return window.elementCard;
  };

})();
