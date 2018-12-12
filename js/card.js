  'use strict'
  // создание массива авторов

  var generatedPeoples = function (numberPeoples) {
    var authors = [];
    for (var i = 0; i < numberPeoples; i++) {
      var people = {
        author: {
          avatar: 'img/avatars/user0' + randomNumber(1, 8) + '.png'
        },
        offer: {
          title: houseDiscription[randomNumber(0, houseDiscription.length)],
          address: '' + randomNumber(0, 3000) + '\, ' + randomNumber(0, 1500),
          price: randomNumber(1000, 1000000),
          type: houseType[randomNumber(0, 3)],
          rooms: randomNumber(1, 5),
          guests: randomNumber(1, 10),
          checkin: checkin[randomNumber(0, 2)],
          checkout: checkout[randomNumber(0, 2)],
          features: newFeatures,
          description: '',
          photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
          ]
        },
        location: {
          x: randomNumber(0, map.clientWidth),
          y: randomNumber(130, 630)
        }
      };
      authors.push(people);
    }
    return authors;
  };

  var peoples = generatedPeoples(7);

  // добавление дополнительных картинок в card

  var cardImage = document.querySelector('#card')
    .content
    .querySelector('.popup__photos');

  var cardImg = document.querySelector('#card')
    .content
    .querySelector('.popup__photos')
    .querySelector('.popup__photo');


  var cardImageTemplate = function () {
    for (var z = 1; z < 3; z++) {
      var cardImageTemp = cardImg.cloneNode(true);
      cardImageTemp.src = peoples[0].offer.photos[z];
      cardImage.appendChild(cardImageTemp);
    }
  };

  cardImageTemplate();

  // изменение удобств ['palace', 'flat', 'house', 'bungalo'];

  var convertType = function () {
    var type = houseType[randomNumber(0, houseType.length - 1)];
    if (type === 'palace') {
      type = 'Дворец';
    } else if (type === 'flat') {
      type = 'Квартира';
    } else if (type === 'house') {
      type = 'Дом';
    } else {
      type = 'Бунгало';
    }
    return type;
  };

  window.data = {
    convertType: convertType,
    peoples: peoples,
    map: map
  };
})();
