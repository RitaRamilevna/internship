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
          subList.style.maxHeight = '0';
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

  /* const subLinks = document.querySelectorAll('.nav__sub-link');
  subLinks.forEach((subLink) => {
    subLink.addEventListener('click', () => {
      subLinks.forEach((link) => link.classList.remove('nav__sub-link--current'));
      subLink.classList.add('nav__sub-link--current');

      // Закрытие меню при клике на подпункт
      const nav = document.querySelector('.nav');
      const body = document.querySelector('body');
      const navTogglerIcon = nav.querySelector('.nav__toggle-icon');

      nav.classList.remove('nav--opened');
      nav.classList.add('nav--closed');
      navTogglerIcon.classList.remove('nav--opened');
      navTogglerIcon.classList.add('nav--closed');
      body.classList.remove('page-body--overlay');

      // Удаление класса nav__item--opened и добавление класса nav__item--closed
      const parentItem = subLink.closest('.nav__item');
      parentItem.classList.remove('nav__item--opened');
      parentItem.classList.add('nav__item--closed');
      const subList = parentItem.querySelector('.nav__sub-list');
      if (subList) {
        subList.style.maxHeight = '0';
      }
    });
  });*/

  // Обработчик события click на ссылки категорий меню
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--icon)');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const nav = document.querySelector('.nav');
        const body = document.querySelector('body');
        const navTogglerIcon = nav.querySelector('.nav__toggle-icon');

        nav.classList.remove('nav--opened');
        nav.classList.add('nav--closed');
        navTogglerIcon.classList.remove('nav--opened');
        navTogglerIcon.classList.add('nav--closed');
        body.classList.remove('page-body--overlay');

        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  });


};
