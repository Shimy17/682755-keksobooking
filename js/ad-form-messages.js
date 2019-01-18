'use strict';

(function () {
  var main = document.querySelector('main');
  var onSubmit = function (message) {
    var onCloseMessage = function (evt) {
      if (evt.type === 'click') {
        message.removeEventListener('click', onCloseMessage);
        document.removeEventListener('keydown', onCloseMessage);
        main.removeChild(message);
      }
      ;
      var onCloseMessage = function (evnt) {
      if (evt.key === 'Esc') {
        message.removeEventListener('click', onCloseMessage);
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
