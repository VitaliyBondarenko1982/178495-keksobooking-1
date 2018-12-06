'use strict';

var NUMBER_OBJECTS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_SIZE = 40;

// Функция,возвращающая случайное значение из заданого интервала
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min + 1) + min - 0.5);
};

// Функция, возвращающая случайный елемент из массива
var getRandomElement = function (array) {
  var randomIndex = getRandomNumber(0, array.length - 1);
  var randomElement = array[randomIndex];
  return randomElement;
};

function getArrayFromArray(array, length) {
  length = length ? length : getRandomNumber(1, array.length);
  var newArray = [];

  while (newArray.length < length) {
    pushArray(array, newArray);
  }

  return newArray;
}

function pushArray(array, newArray) {
  var secondComments = getRandomElement(array);

  if (newArray.indexOf(secondComments) !== -1) {
    pushArray(array, newArray);
  } else {
    newArray.push(secondComments);
  }
}

var ads = [];

for (var i = 0; i < NUMBER_OBJECTS; i++) {
  ads.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: location.x + ', ' + location.y,
      price: getRandomNumber(1000, 1000000),
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 100),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getArrayFromArray(FEATURES),
      description: '',
      photos: PHOTOS,
    },
    location: {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(150, 500)
    }
  });

  ads[i].offer.address = ads[i].location.x + ', ' + ads[i].location.y;
}

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

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

var makePin = function (dataPin) {
  var elementPin = makeElement('button', 'map__pin');
  elementPin.style.left = dataPin.location.x + PIN_SIZE / 2 + 'px';
  elementPin.style.top = dataPin.location.y + PIN_SIZE + 'px';

  var image = makeElement('img');
  image.src = dataPin.author.avatar;
  image.alt = dataPin.offer.title;
  image.style.width = PIN_SIZE + 'px';
  image.style.height = PIN_SIZE + 'px';
  elementPin.appendChild(image);

  return elementPin;
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var makeCard = function (dataCard) {
  var elementCard = mapCardTemplate.cloneNode(true);
  var offer = dataCard.offer;
  elementCard.querySelector('.popup__title').textContent = offer.title;
  elementCard.querySelector('.popup__text--address').textContent = offer.address;
  elementCard.querySelector('.popup__text--price ').textContent = offer.price + '₽/ночь';
  elementCard.querySelector('.popup__type').textContent = transformType(offer.type);
  elementCard.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  elementCard.querySelector('.popup__features').textContent = offer.features.join(', ');
  elementCard.querySelector('.popup__description').textContent = offer.description;

  var elementPhotos = elementCard.querySelector('.popup__photos');
  var templatePhoto = elementCard.querySelector('.popup__photo');
  var elementPhoto = elementPhotos.removeChild(templatePhoto);
  for (var j = 0; j < offer.photos.length; j++) {
    var currentPhoto = elementPhoto.cloneNode(true);
    currentPhoto.src = offer.photos[j];
    elementPhotos.appendChild(currentPhoto);
  }

  elementCard.querySelector('.popup__avatar').src = dataCard.author.avatar;

  return elementCard;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < ads.length; i++) {
  fragment.appendChild(makePin(ads[i]));
}

fragment.appendChild(makeCard(ads[0]));
userDialog.appendChild(fragment);
