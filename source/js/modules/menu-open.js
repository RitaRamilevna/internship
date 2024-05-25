function menuOpen() {
  const nav = document.querySelector('.nav');
  const body = document.querySelector('body');
  const navToggle = nav.querySelector('.nav__toggle');
  const navTogglerIcon = nav.querySelector('.nav__toggle-icon');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--opened');
    nav.classList.toggle('nav--closed');
    navTogglerIcon.classList.toggle('nav--opened');
    navTogglerIcon.classList.toggle('nav--closed');
    body.classList.toggle('body--overlay');

    const navItems = nav.querySelectorAll('.nav__item--closed');
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('nav__item--opened');
      });
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    const isNav = target.closest('.nav');
    const isNavOpened = nav.classList.contains('nav--opened');

    if (!isNav && isNavOpened) {
      nav.classList.remove('nav--opened');
      nav.classList.add('nav--closed');
      navTogglerIcon.classList.remove('nav--opened');
      navTogglerIcon.classList.add('nav--closed');
      body.classList.remove('body--overlay');

      setTimeout(() => {
        const openedItems = nav.querySelectorAll('.nav__item--opened');
        openedItems.forEach((item) => {
          item.classList.remove('nav__item--opened');
        });
      }, 300);
    }
  });
}

export { menuOpen };
