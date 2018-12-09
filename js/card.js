'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  window.elementCard = mapCardTemplate.cloneNode(true);
  var mapFilter = document.querySelector('.map__filters-container');
  mapFilter.before(window.elementCard);
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

  var makeCard = function (dataCard) {
    var offer = dataCard.offer;
    window.elementCard.querySelector('.popup__title').textContent = offer.title;
    window.elementCard.querySelector('.popup__text--address').textContent = offer.address;
    window.elementCard.querySelector('.popup__text--price ').textContent = offer.price + '₽/ночь';
    window.elementCard.querySelector('.popup__type').textContent = transformType(offer.type);
    window.elementCard.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    window.elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    window.elementCard.querySelector('.popup__features').textContent = offer.features.join(', ');
    window.elementCard.querySelector('.popup__description').textContent = offer.description;

    var elementPhotos = window.elementCard.querySelector('.popup__photos');
    var templatePhoto = window.elementCard.querySelector('.popup__photo');
    var elementPhoto = elementPhotos.removeChild(templatePhoto);
    elementPhotos.innerHTML = '';

    for (var j = 0; j < offer.photos.length; j++) {
      var currentPhoto = elementPhoto.cloneNode(true);
      currentPhoto.src = offer.photos[j];
      elementPhotos.appendChild(currentPhoto);
    }

    window.elementCard.querySelector('.popup__avatar').src = dataCard.author.avatar;
    return window.elementCard;
  };
  window.makeCard = makeCard;
})();
