'use strict';

(function () {
  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  };

  var PIN_SIZE = 40;
  var map = document.querySelector('.map');
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

    var pinClickHandler = function (item) {
      map.appendChild(window.makeCard(item));
      window.elementCard.classList.remove('hidden');
      document.addEventListener('keydown', window.popupEscPressHandler);
    };

    elementPin.addEventListener('click', function () {
      pinClickHandler(dataCard);
      document.addEventListener('keydown', window.popupEnterPressHandler);
    });

    return elementPin;
  };

  window.makePin = makePin;
  window.map = map;
})();
