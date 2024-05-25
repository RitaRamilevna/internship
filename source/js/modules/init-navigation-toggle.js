export const initNavigationToggle = () => {
  const buttons = document.querySelectorAll('.nav__link.nav__link--icon');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const parentItem = button.parentElement;

      parentItem.classList.toggle('nav__item--opened');
      parentItem.classList.toggle('nav__item--closed');
      const subList = parentItem.querySelector('.nav__sub-list');
      if (subList) {
        if (parentItem.classList.contains('nav__item--opened')) {
          subList.style.maxHeight = `${subList.scrollHeight}px`;
        } else {
          subList.style.maxHeight = null;
        }
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });

  const subLinks = document.querySelectorAll('.nav__sub-link');
  subLinks.forEach((subLink) => {
    subLink.addEventListener('click', () => {
      subLinks.forEach((subLink) => subLink.classList.remove('nav__sub-link--current'));
      subLink.classList.add('nav__sub-link--current');
    });
  });
};
