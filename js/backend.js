'use strict';

(function () {
  var REQUEST_METHOD = {
    'get': 'GET',
    'post': 'POST'
  };

  var URL = {
    'load': 'https://js.dump.academy/keksobooking/data',
    'upload': 'https://js.dump.academy/keksobooking'
  };

  var REQUEST_STATUS_CODE = {
    'ok': 200,
    'badRequest': 400,
    'unauthorized': 401,
    'notFound': 404
  };

  var ERROR_MESSAGE = {
    'default': 'Ошибка загрузки, статус ответа: ',
    'badRequest': 'Неверный запрос',
    'unauthorized': 'Пользователь не авторизован',
    'notFound': 'Ничего не найдено',
    'badConnection': 'Произошла ошибка соединения',
    'timeout': 'Запрос не успел выполниться за ' + TIMEOUT_LOAD + 'мс'
  };

  var TIMEOUT_LOAD = 10000;
  var TIMEOUT_MESSAGE = 5000;

  var request;
  var error;
  var requestSuccess;

  var getResponse = function () {
    switch (request.status) {
      case REQUEST_STATUS_CODE.ok:
        requestSuccess = true;
        return request.response;
      case REQUEST_STATUS_CODE.badRequest:
        error = ERROR_MESSAGE.badRequest;
        requestSuccess = false;
        return error;
      case REQUEST_STATUS_CODE.unauthorized:
        error = ERROR_MESSAGE.unauthorized;
        requestSuccess = false;
        return error;
      case REQUEST_STATUS_CODE.notFound:
        error = ERROR_MESSAGE.notFound;
        requestSuccess = false;
        return error;

      default:
        requestSuccess = false;
        error = ERROR_MESSAGE.default + request.status;
    }
    return error;
  };

  window.backend = {
    // Downloads postings data from server
    load: function (onLoad, onError) {
      request = new XMLHttpRequest();
      request.responseType = 'json';

      request.addEventListener('load', function () {
        getResponse();
        if (requestSuccess) {
          onLoad(request.response);
        } else {
          onError(error);
        }
      });

      request.addEventListener('error', function () {
        error = ERROR_MESSAGE.badConnection;
        onError(error);
      });

      request.addEventListener('timeout', function () {
        error = ERROR_MESSAGE.timeout;
        onError(error);
      });

      request.open(REQUEST_METHOD.get, URL.load);
      request.send();
    },

    // Uploads form data to server
    upload: function (data, onLoad, onError) {
      request = new XMLHttpRequest();
      request.responseType = 'json';

      request.addEventListener('load', function () {
        getResponse();
        if (requestSuccess) {
          onLoad(request.response);
        } else {
          onError(error);
        }
      });

      request.open(REQUEST_METHOD.post, URL.upload);
      request.send(data);
    }
  };

  var errorElement = document.createElement('div');
  var hideErrorMessage = function () {
    setTimeout(function () {
      errorElement.classList.add('hidden');
    }, TIMEOUT_MESSAGE);
  };

  window.backend.errorDataHandler = function (errorMessage) {
    errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    errorElement.style.color = '#333333';
    errorElement.style.textAlign = 'center';
    errorElement.style.margin = 'center auto';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '35px';
    errorElement.style.zIndex = '100';
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
    hideErrorMessage();
  };

})();
