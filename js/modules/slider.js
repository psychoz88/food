function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
      // Slider

  const slides = document.querySelectorAll(slide),
  slider = document.querySelector(container),
  prev = document.querySelector(prevArrow),
  next = document.querySelector(nextArrow),
  total = document.querySelector(totalCounter),
  current = document.querySelector(currentCounter),
  slidesWrapper = document.querySelector(wrapper), // окошко через которое видно слайды
  slidesField = document.querySelector(field), // поле где все слайды
  width = window.getComputedStyle(slidesWrapper).width; // значения ширины на окне из уже примененных стилей данного объекта

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} else {
total.lextContent = slides.length;
current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; // это наше 'окно'

slides.forEach(slide => {
slide.style.width = width; // теперь все слайды одинаковой ширины и все влезут в переменную slidesField
});

slider.style.position = 'relative'; // чтобы елементы absolute нормально работали

const indicators = document.createElement('ol'),
  dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1); // data-slide-to="2"
dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
`;
if (i == 0) {
dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
}

function deleteNotDigits(str) { 
return +str.replace(/[^\d.]/g, '');
}; // функция ставиться везде где надо расчитать число чтобы нормально слайдер перемещался. Использует регулярное выражение которое не с урока так как то не работает

next.addEventListener('click', () => {
if (offset  == deleteNotDigits(width) * (slides.length - 1)){ // последний слайд вычисляется по такой формуле
offset = 0;
// +width.slice(0, width.length - 2) - проставить везде где такое надо то есть всего в трёх местах
// +width.replace(/[^\d.]/g, '')
} else {
offset += deleteNotDigits(width);
// offset += +width.slice(0, width.length - 2);
}

slidesField.style.transform = `translateX(-${offset}px)`; // это наше 'колесо' которое переключает слайды

if (slideIndex == slides.length) {
slideIndex = 1;
} else {
slideIndex++;
}

if (slides.length < 10) {
current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
if (offset == 0){
offset  = deleteNotDigits(width) * (slides.length - 1);
// offset  = +width.slice(0, width.length - 2) * (slides.length - 1);
} else {
offset -= deleteNotDigits(width);
// offset -= +width.slice(0, width.length - 2);
}

slidesField.style.transform = `translateX(-${offset}px)`;

if (slideIndex == 1) {
slideIndex = slides.length;
} else {
slideIndex--;
}

if (slides.length < 10) {
current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {
dot.addEventListener('click', (e) => {
  const slideTo = e.target.getAttribute('data-slide-to');

  slideIndex = slideTo;
  offset = deleteNotDigits(width) * (slideTo - 1);
// offset = +width.slice(0, width.length - 2) * (slideTo - 1);

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slides.length < 10) {
      current.textContent =  `0${slideIndex}`;
  } else {
      current.textContent =  slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = ".5");
  dots[slideIndex-1].style.opacity = 1;
});
});

//  showSlides(slideIndex);
//
//  if (slides.length < 10) {
//    total.textContent = `0${slides.length}`;
//  } else {
//    total.lextContent = slides.length;
//  }
//
//  function showSlides(n) {
//    if (n > slides.length) {
//      slideIndex = 1;
//    }
//
//    if (n < 1) {
//      slideIndex = slides.length;
//    };
//
//    slides.forEach(item => item.style.display = 'none')//;
//
//    slides[slideIndex - 1].style.display = 'block';
//
//    if (slides.length < 10) {
//      current.textContent = `0${slideIndex}`;
//    } else {
//      current.lextContent = slideIndex;
//    }
//  }
//
//  function plusSlides(n) {
//    showSlides(slideIndex += n);
//  }
//
//  prev.addEventListener('click', () => {
//    plusSlides(-1);
//  });
//
//  next.addEventListener('click', () => {
//    plusSlides(1);
//  });
//

} // slider

export default slider;