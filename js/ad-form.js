'use strict';

(function () {
  var adFormElements = window.generalElements.adForm.elements;
  var housingAddress = adFormElements.address;
  var housingTypeSelect = adFormElements.type;
  var housingPriceInput = adFormElements.price;
  var timeInSelect = adFormElements.timein;
  var timeOutSelect = adFormElements.timeout;
  var roomsSelect = adFormElements.rooms;
  var guestsSelect = adFormElements.capacity;
  var guestsSelectOptions = guestsSelect.children;

  var housingTypeAndPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomsAndGuests = {
    100: ['0'],
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1']
  };

  var currentHousingAddress = {
    updateHousingAddress: function (PositionX, PositionY) {
      if (PositionX && PositionY) {
        this.x = PositionX + window.pinMain.AddressOffset.X;
        this.y = PositionY + window.pinMain.AddressOffset.Y;
      }
      housingAddress.value = this.x + ', ' + this.y;
    }
  };

  var validateHousingPrice = function (housingType) {
    housingPriceInput.min = housingTypeAndPrice[housingType];
    housingPriceInput.placeholder = housingTypeAndPrice[housingType];
  };

  var validateTimeIn = function (timeOut) {
    timeInSelect.value = timeOut;
  };

  var validateTimeOut = function (timeIn) {
    timeOutSelect.value = timeIn;
  };

  var validateGuests = function (rooms) {
    guestsSelect.value = roomsAndGuests[rooms][0];
    var i = guestsSelectOptions.length;
    while (i--) {
      guestsSelectOptions[i].removeAttribute('disabled');
      if (roomsAndGuests[rooms].indexOf(guestsSelectOptions[i].value) === -1) {
        guestsSelectOptions[i].setAttribute('disabled', '');
      }
    }
  };

  var setToDefault = function () {
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
  };

  window.generalElements.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onSuccess = function () {
      var message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      window.generalElements.adForm.classList.add('ad-form--disabled');
      window.adFormMessages.onSubmit(message);
      window.generalElements.adForm.reset();
    };
    var onError = function () {
      var message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      window.adFormMessages.onSubmit(message);
    };
    window.backend.postData(onSuccess, onError, new FormData(window.generalElements.adForm));
  });

  housingTypeSelect.addEventListener('change', function () {
    validateHousingPrice(housingTypeSelect.value);
  });
  timeInSelect.addEventListener('change', function () {
    validateTimeOut(timeInSelect.value);
  });
  timeOutSelect.addEventListener('change', function () {
    validateTimeIn(timeOutSelect.value);
  });
  roomsSelect.addEventListener('change', function () {
    validateGuests(roomsSelect.value);
  });

  currentHousingAddress.updateHousingAddress(parseInt(window.pinMain.startPosition.x, 10), parseInt(window.pinMain.startPosition.y, 10));

  window.adForm = {
    currentHousingAddress: currentHousingAddress,
    setToDefault: setToDefault,
  };
})();
