'use strict';


(function () {
  var NUMBER_OBJECTS = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.ads = [];


  for (var i = 0; i < NUMBER_OBJECTS; i++) {
    window.ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: window.utils.getRandomElement(TITLES),
        address: location.x + ', ' + location.y,
        price: window.utils.getRandomNumber(1000, 1000000),
        type: window.utils.getRandomElement(TYPES),
        rooms: window.utils.getRandomNumber(1, 5),
        guests: window.utils.getRandomNumber(1, 100),
        checkin: window.utils.getRandomElement(CHECKIN_TIME),
        checkout: window.utils.getRandomElement(CHECKOUT_TIME),
        features: window.utils.getArrayFromArray(FEATURES),
        description: '',
        photos: PHOTOS,
      },
      location: {
        x: window.utils.getRandomNumber(300, 900),
        y: window.utils.getRandomNumber(150, 500)
      }
    });

    window.ads[i].offer.address = window.ads[i].location.x + ', ' + window.ads[i].location.y;
  }

})();
