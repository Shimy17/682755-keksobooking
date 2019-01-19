'use strict';

(function () {
  var main = document.querySelector('main');
  var onSubmit = function (message) {
    var onCloseMessage = function (evt) {
      if (evt.type === 'click') {
        document.removeEventListener('keydown', onCloseMessage);
        main.removeChild(message);
      }
      if (evt.key === 'Esc') {
        document.removeEventListener('keydown', onCloseMessage);
        main.removeChild(message);
      }
    };
    message.addEventListener('click', onCloseMessage);
    document.addEventListener('keydown', onCloseMessage);
    main.appendChild(message);
  };

  window.adFormMessages = {
    onSubmit: onSubmit
  };
})();
