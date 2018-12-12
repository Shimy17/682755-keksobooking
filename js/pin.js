'use strict'
var authorPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mapPinTemplate = document.querySelector('.map__pins');
// сэмулируем перетаскивание метки
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  window.data.map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  pinDelHidden();
  disSelect();
  disFieldset();

  var coordsPin = {
    x: evt.pageX,
    y: evt.pageY
  };

  var onMouseMov = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: coordsPin.x - moveEvt.pageX,
      y: coordsPin.y - moveEvt.pageY
    };

    var limits = {
      top: window.data.map.offsetTop + mainPin.offsetHeight + 30,
      right: window.data.map.offsetWidth + window.data.map.offsetLeft - mainPin.clientWidth / 2,
      bottom: window.data.map.offsetHeight + window.data.map.offsetTop - mainPin.offsetHeight - 84,
      left: window.data.map.offsetLeft + mainPin.clientWidth / 2
    };

    coordsPin = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };
    // при движении изменяем координаты на которые указывает наш пин
    var addressLeft = mainPin.offsetLeft + 32.5;
    var addressTop = mainPin.offsetTop + 65;
    inputAdress.value = addressLeft + '\, ' + addressTop;

    if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
    (coordsPin.y > limits.top && coordsPin.y < limits.bottom)) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMov);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMov);
  document.addEventListener('mouseup', onMouseUp);
});

// устанавливаем координаты на которые указывает наш пин
var inputAdress = document.querySelector('#address');
var addressLeft = mainPin.offsetLeft + 32.5;
var addressTop = mainPin.offsetTop + 65;
inputAdress.value = addressLeft + '\, ' + addressTop;

// сделаем так, что бы при нажатии на пин отображалась соответствующая ему катрочка
// соберем массив из элементов card__pin
var mapCardArr = document.querySelectorAll('.map__card');

// обработаем событие
var оnOpen = function OnOpen() {
  var loop = function loop(i) {
    mapPins[i].addEventListener('click', function () {
      mapCardArr[i - 1].classList.remove('hidden');
    });
  };

  for (var i = 1; i < mapPins.length; i++) {
    loop(i);
  }
};
