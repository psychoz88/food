function calc() {
    // Calc

const result = document.querySelector('.calculating__result span');
let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
  sex = localStorage.getItem('sex'); // если значение есть в базе то ставить 
} else {
  sex = 'female'; // если нету значения в базе то ставим по стандарту
  localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) { // функция которая ставит классы активности елементам которые в localStorage
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute('id') === localStorage.getItem('sex')) {
      elem.classList.add(activeClass);
    }
    if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      elem.classList.add(activeClass);
    }
  });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


function calcTotal() {
  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = '____';
    return;
  }

  if (sex ==='female') {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

calcTotal();

function getStaticInformation(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // запоминает что вводил пользователь
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }
  
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calcTotal();
    });
  });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);
  input.addEventListener('input', () => {

    if (input.value.match(/\D/g)){ // если ввели не цифру
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }

    switch(input.getAttribute('id')) { // нужно проверить id
      case 'height': // если действительно рост то
        height = +input.value;
        break;
      case 'weight': // если действия происходят в весе
        weight = +input.value;
        break;
      case 'age': // если в графе возраст
        age = +input.value;
        break;
    }
    calcTotal();
  })
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

} // calc

export default calc;