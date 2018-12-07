'use strict';

var NUMBER_OBJECTS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_SIZE = 40;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_LEG = 22;
var ESC_KEYCODE = 27;


// utils

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

// utils

// create array

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

// create array


var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var pinClickHandler = function (item) {
  map.appendChild(makeCard(item));
  elementCard.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};


var makePin = function (dataCard) {
  var elementPin;
  elementPin = makeElement('button', 'map__pin');
  elementPin.style.left = dataCard.location.x + PIN_SIZE / 2 + 'px';
  elementPin.style.top = dataCard.location.y + PIN_SIZE + 'px';

  var image = makeElement('img');
  image.src = dataCard.author.avatar;
  image.alt = dataCard.offer.title;
  image.style.width = PIN_SIZE + 'px';
  image.style.height = PIN_SIZE + 'px';
  elementPin.appendChild(image);

  elementPin.addEventListener('click', function () {
    pinClickHandler(dataCard);
  });

  return elementPin;
};


// render pins

var fragmentPin = document.createDocumentFragment();
for (i = 0; i < ads.length; i++) {
  fragmentPin.appendChild(makePin(ads[i]));
}

// render pins


var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var elementCard = mapCardTemplate.cloneNode(true);
var mapFilter = document.querySelector('.map__filters-container');
mapFilter.before(elementCard);
elementCard.classList.add('hidden');


var makeCard = function (dataCard) {
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
  elementPhotos.innerHTML = '';

  for (var j = 0; j < offer.photos.length; j++) {
    var currentPhoto = elementPhoto.cloneNode(true);
    currentPhoto.src = offer.photos[j];
    elementPhotos.appendChild(currentPhoto);
  }

  elementCard.querySelector('.popup__avatar').src = dataCard.author.avatar;
  return elementCard;
};


// add disabled attribute to form fields when page is not active

var adForm = document.querySelector('.ad-form');
var fieldsetElements = adForm.getElementsByTagName('fieldset');
var fieldsetElem;
for (var k = 0; k < fieldsetElements.length; k++) {
  fieldsetElem = fieldsetElements[k];
  fieldsetElem.setAttribute('disabled', 'disabled');
}

// add disabled attribute to form fields when page is not active


// move main pin

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var inputAddress = document.getElementById('address');
var mainPin = document.querySelector('.map__pin--main');
var currentMainPinX;
var currentMainPinY;
var mainPinX = Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_SIZE / 2);
var mainPinY = Math.floor(parseInt(mainPin.style.top, 10) + MAIN_PIN_SIZE / 2);

inputAddress.value = mainPinX + ', ' + mainPinY;
var getActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (k = 0; k < fieldsetElements.length; k++) {
    fieldsetElem = fieldsetElements[k];
    fieldsetElem.removeAttribute('disabled');
  }
  inputAddress.value = currentMainPinX + ', ' + (currentMainPinY + MAIN_PIN_LEG);
  mapPins.appendChild(fragmentPin);
};


mainPin.addEventListener('mousedown', function (evt) {
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

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    currentMainPinX = Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_SIZE / 2);
    currentMainPinY = Math.floor(parseInt(mainPin.style.top, 10) + MAIN_PIN_SIZE / 2);
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    getActivePage();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);


});

// move main pin


// close popup

var popupClose = document.querySelector('.popup__close');

var closePopup = function () {
  elementCard.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

popupClose.addEventListener('click', function () {
  closePopup();
});

// close popup


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
