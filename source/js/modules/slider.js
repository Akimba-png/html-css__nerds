const PAGE_INDEX_ROUTE = '/';
const currentRoute = window.location.pathname;

if (currentRoute === PAGE_INDEX_ROUTE) {
  const sliderElement = document.querySelector(".slider");
  const toggleContainerElement = sliderElement.querySelector(".slider__toggles");
  const sliderItemElements = sliderElement.querySelectorAll(".slider__item");
  const toggleElements = toggleContainerElement.children;

  function onToggleClick({target}) {
    if (target.matches(".slider__toggle--current")) {
      return;
    }
    if(target.matches(".slider__toggle")) {
      const index = [...toggleElements].indexOf(target);
      sliderElement.querySelector(".features__item--current").classList.remove("features__item--current");
      sliderElement.querySelector(".slider__toggle--current").classList.remove("slider__toggle--current");
      sliderItemElements[index].classList.add("features__item--current");
      target.classList.add("slider__toggle--current");
    }
  };
  toggleContainerElement.addEventListener("click", onToggleClick);
}
