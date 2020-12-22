import {getResource} from '../services/services';

function cards() {
      // Классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // массив будет
      this.parent = document.querySelector(parentSelector); // DOM едемент лежит теперь тут
      this.transfer = 27; //изменение цены
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `               
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parent.append(element);
    }
  }

 getResource('http://localhost:3000/menu')
   .then(data => {
     data.forEach(({img, altimg, title, descr, price}) => { // деструктуризация объекта - когда из объекта вытаскиваем отдельные свойства в качестве отдельной переменной
       new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // конструктор будет создаваться столько раз сколько у нас объектов внутри массива который прийдет из сервера
     });
   });


// МОЙ РАБОЧИЙ КОД
// если захочу его подключить то закоментировать сверху и код в файле services.js

//  const getResource = async (url) => {
//  const res = await fetch(url);
//
//  if (!res.ok) {
//    throw new Error(`Could not fetch ${url}, status: $//{res.status}`); // выкидываем Объект ошибки(текст //ошибки)
//  }
//  return await res.json()
//};
//  axios.get('http://localhost:3000/menu')
//    .then(data => {
//      data.data.forEach(({img, altimg, title, descr, //price}) => { // обращяемся к тем данным которые //внутри объекта который уже получили
//      new MenuCard(img, altimg, title, descr, price, './/menu .container').render();
//    });
//  });


} // cards

export default cards;