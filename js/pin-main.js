'use strict';

/* Модуль pin-main.js */
(function () {
  var AddressOffset = {
    X: 32,
    Y: 81
  };

  var pinMain = window.generalElements.pinMain;

  var startPosition = {
    x: pinMain.style.left,
    y: pinMain.style.top
  };

  var currentPosition = {
    updatePosition: function () {
      this.x = pinMain.style.left;
      this.y = pinMain.style.top;
      window.adForm.currentHousingAddress.updateHousingAddress(parseInt(this.x, 10), parseInt(this.y, 10));
    }
  };

  var setToDefault = function () {
    pinMain.style.left = startPosition.x;
    pinMain.style.top = startPosition.y;
    currentPosition.updatePosition();
  };

  window.pinMain = {
    AddressOffset: AddressOffset,
    startPosition: startPosition,
    currentPosition: currentPosition,
    setToDefault: setToDefault,
  };
})();
