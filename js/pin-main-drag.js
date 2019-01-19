'use strict';

(function () {
  var pinMain = window.generalElements.pinMain;
  var pinMainPosition = {};
  var mousePosition = {};

  var updatePosition = function (shift) {
    var xMax = window.util.getParentElementWidth(pinMain);
    var pendingAddressPosition = {
      x: window.adForm.currentHousingAddress.x - shift.x,
      y: window.adForm.currentHousingAddress.y - shift.y
    };
    if (pendingAddressPosition.x <= 0) {
      pinMainPosition.x = 0 - window.pinMain.AddressOffset.X;
    } else if (pendingAddressPosition.x >= xMax) {
      pinMainPosition.x = xMax - window.pinMain.AddressOffset.X;
    } else {
      pinMainPosition.x -= shift.x;
    }
    if (pendingAddressPosition.y <= 130) {
      pinMainPosition.y = 130 - window.pinMain.AddressOffset.Y;
    } else if (pendingAddressPosition.y >= 630) {
      pinMainPosition.y = 630 - window.pinMain.AddressOffset.Y;
    } else {
      pinMainPosition.y -= shift.y;
    }
  };

  var onDragPinMain = function (evt) {
    pinMainPosition.x = parseInt(pinMain.style.left, 10);
    pinMainPosition.y = parseInt(pinMain.style.top, 10);
    mousePosition.x = evt.clientX;
    mousePosition.y = evt.clientY;
    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  };

  var onPinMainMouseMove = function (moveEvt) {
    var shift = {
      x: mousePosition.x - moveEvt.clientX,
      y: mousePosition.y - moveEvt.clientY
    };
    mousePosition.x -= shift.x;
    mousePosition.y -= shift.y;
    updatePosition(shift);
    pinMain.style.left = pinMainPosition.x + 'px';
    pinMain.style.top = pinMainPosition.y + 'px';
    window.pinMain.currentPosition.updatePosition();
  };

  var onPinMainMouseUp = function () {
    document.removeEventListener('mousemove', onPinMainMouseMove);
    document.removeEventListener('mouseup', onPinMainMouseUp);
  };

  pinMain.addEventListener('mousedown', onDragPinMain);
})();
