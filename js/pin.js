'use strict';

(function () {
  var PIN_SIZE = 40;

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  };


  window.pin = {
    mapElement: document.querySelector('.map'),
    make: function (dataCard) {
      var elementPin;
      elementPin = makeElement('button', 'map__pin');
      elementPin.style.left = dataCard.location.x + PIN_SIZE / 2 + 'px';
      elementPin.style.top = dataCard.location.y + PIN_SIZE + 'px';

      var image = makeElement('img');
      image.src = dataCard.author.avatar;
      image.alt = dataCard.offer.title;
      image.style.width = PIN_SIZE + 'px';
      image.style.height = PIN_SIZE + 'px';
      elementPin.classList.add('user__pin');
      elementPin.appendChild(image);

      var pinClickHandler = function (item) {
        window.pin.mapElement.appendChild(window.makeCard(item));
        window.elementCard.classList.remove('hidden');
        document.addEventListener('keydown', window.popupEscPressHandler);
      };

      elementPin.addEventListener('click', function () {
        pinClickHandler(dataCard);
        document.addEventListener('keydown', window.popupEnterPressHandler);
      });

      return elementPin;
    }
  };
})();
