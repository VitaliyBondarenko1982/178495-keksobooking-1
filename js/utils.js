'use strict';


(function () {
  window.utils = {
    // Функция,возвращающая случайное значение из заданого интервала
    getRandomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min + 1) + min - 0.5);
    },

    // Функция, возвращающая случайный елемент из массива
    getRandomElement: function (array) {
      var randomIndex = window.utils.getRandomNumber(0, array.length - 1);
      var randomElement = array[randomIndex];
      return randomElement;
    },

    // Функция, возвращающая случайный массив из заданного массива
    getArrayFromArray: function (array, length) {
      length = length ? length : window.utils.getRandomNumber(1, array.length);
      var newArray = [];

      while (newArray.length < length) {
        pushArray(array, newArray);
      }

      return newArray;
    }
  };

  // Функция, добавляющая случайный елемент к новому массиву.

  var pushArray = function (array, newArray) {
    var secondComments = window.utils.getRandomElement(array);

    if (newArray.indexOf(secondComments) !== -1) {
      pushArray(array, newArray);
    } else {
      newArray.push(secondComments);
    }
  };

})();
