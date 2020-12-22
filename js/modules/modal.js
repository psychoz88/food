function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  //modal.classList.toggle("show");
  document.body.style.overflow = "hidden";

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
 
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  //modal.classList.toggle("show");
  document.body.style.overflow = "";
}


function modal(triggerSelector, modalSelector, modalTimerId) {
      // Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", () => openModal(modalSelector, modalTimerId)); // по правилу нельзя вызывать функцию в слушателе потому что при клике она сама запустится. Это обходиться с помощью () =>
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    closeModal(modalSelector);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal(modalSelector);
  }
});

function showModalbyScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener("scroll", showModalbyScroll);
  }
}

window.addEventListener("scroll", showModalbyScroll);

} // modal

export default modal;
export {closeModal};
export {openModal};