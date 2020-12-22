import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  // Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  function bindpostData(form) { // функция отвечает за привязку постинга
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img"); // добавляет новый елемент: при нажатии на кнопку появляетс спиннер
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
      form.insertAdjacentElement("afterend", statusMessage); // Размещает новый елемент сразу после предыдущего. 1 аргумaент - куда именно, 2 аргумент - что именно

      // JSON
      // php не умеет нативно работать с форматом JSON

      const formData = new FormData(form); // formData - это специальный объект который позволяет в форме ключ-значение быстро сформировать все данные которые заполнил пользователь. В (form) пишем ту форму из которой нам надо собрать данные

      // В формате JSON

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // сначала берем formData которая собрала все данные с формы, превращаем с помощью entries ее в матрицу(массив массивов), потом превращаем в классический объект(fromEntries), потом его прекращаем в JSON

      postData("http://localhost:3000/requests", json)
        //.then(data => data.text()) // чтобы точно понимать какой нам прийдет ответ. Там точно не "JSON поэтому в текстовом формате пусть"
        .then((data) => {
          // те данные которые вернул Promise либо сервер
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove(); // убирает сообщение
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset(); // убирает все введенное клиентом
        });
    });
  };


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  }
} // forms

export default forms;