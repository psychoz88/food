function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    // скрытие табов
    tabsContent.forEach((item) => {
      //item.style.display = 'none';
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    // добавляет видимость табам
    //tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    // выбор таба
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) { // удаляет точку спереди
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
} // tabs

export default tabs;