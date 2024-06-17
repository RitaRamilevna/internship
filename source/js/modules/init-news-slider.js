import Swiper from 'swiper';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

let newsSlider;

function initNewsSlider() {
  let totalSlides;
  const maxVisibleButtons = 4;

  newsSlider = new Swiper('.news__swiper', {
    modules: [Grid, Navigation, Pagination],
    speed: 1000,
    autoplay: false,
    autoHeight: true,
    slidesPerView: 'auto',
    pagination: {
      el: '.news__pagination',
      clickable: true,
      watchSlidesProgress: true,
      renderBullet: function (index, className) {
        return `<button class="${className}" data-slide-index="${index + 1}">${index + 1}</button>`;
      },
    },
    navigation: {
      nextEl: '.news__button-navigation--next',
      prevEl: '.news__button-navigation--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        grid: {
          rows: 2,
        },
      },
      768: {
        spaceBetween: 30,
        grid: {
          fill: 'row',
          rows: 2,
        },
      },
      1440: {
        spaceBetween: 32,
        grid: {
          rows: 1,
        },
        allowTouchMove: false,
      },
    },
    on: {
      init: function () {
        totalSlides = this.slides.length;
        updatePaginationButtons(this);
      },
      slideChange: function () {
        updatePaginationButtons(this);
      },
    },
  });

  function updatePaginationButtons(swiper) {
    const paginationButtons = document.querySelectorAll('.news__pagination button');
    const activeSlideIndex = swiper.activeIndex;

    paginationButtons.forEach((button) => button.classList.remove('swiper-pagination-bullet-active'));

    let startIndex = Math.max(0, activeSlideIndex - 1);
    let endIndex = Math.min(totalSlides - 1, startIndex + maxVisibleButtons - 1);

    if (activeSlideIndex > 1 && activeSlideIndex < totalSlides - 2) {
      startIndex = activeSlideIndex - 2;
      endIndex = activeSlideIndex + 1;
    }

    paginationButtons.forEach((button, index) => {
      if (index >= startIndex && index <= endIndex) {
        button.style.display = 'inline-block';
        if (index === activeSlideIndex) {
          button.classList.add('swiper-pagination-bullet-active');
        }
      } else {
        button.style.display = 'none';
      }
    });
  }

  return newsSlider;
}

function initTabs() {
  const tabButtons = document.querySelectorAll('[data-name="news-tab"]');
  const newsItems = document.querySelectorAll('[data-news="slide"]');
  const newsContainer = document.querySelector('.news__list');

  function setTallSlideClass() {
    const slides = newsContainer.children;
    const screenWidth = window.innerWidth;

    Array.from(slides).forEach((slide, index) => {
      slide.classList.remove('news__item--wide');
      if (screenWidth >= 1440) {
        if (index === 0) {
          slide.classList.add('news__item--wide');
        }
      } else if (screenWidth >= 320 && screenWidth <= 767) {
        if (index % 2 === 0) {
          slide.classList.add('news__item--wide');
        }
      }
    });
  }

  function showTab(filter) {
    newsContainer.innerHTML = '';

    let filteredItems;
    if (filter === 'all') {
      filteredItems = Array.from(newsItems);
    } else {
      filteredItems = Array.from(newsItems).filter((item) => item.dataset.filter === filter);
    }

    filteredItems.forEach((item) => {
      newsContainer.appendChild(item.cloneNode(true));
    });

    if (newsSlider) {
      newsSlider.destroy(true, true);
    }

    newsSlider = initNewsSlider();

    setTallSlideClass();
  }

  function initSubMenuLinks() {
    const subMenuLinks = document.querySelectorAll('.nav__sub-link');

    subMenuLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Закрытие меню навигации после клика по ссылке подменю
          const nav = document.querySelector('.nav');
          const body = document.querySelector('body');
          const navTogglerIcon = nav.querySelector('.nav__toggle-icon');

          nav.classList.remove('nav--opened');
          nav.classList.add('nav--closed');
          navTogglerIcon.classList.remove('nav--opened');
          navTogglerIcon.classList.add('nav--closed');
          body.classList.remove('page-body--overlay');

          // Удаление класса nav__item--opened и добавление класса nav__item--closed
          const parentItem = link.closest('.nav__item');
          parentItem.classList.remove('nav__item--opened');
          parentItem.classList.add('nav__item--closed');
          const subList = parentItem.querySelector('.nav__sub-list');
          if (subList) {
            subList.style.maxHeight = '0';
          }

          // Добавление классов активности для ссылки подменю и родительского элемента
          subMenuLinks.forEach((subLink) => subLink.classList.remove('nav__sub-link--current'));
          link.classList.add('nav__sub-link--current');
          const navItems = document.querySelectorAll('.nav__item');
          navItems.forEach((item) => item.classList.remove('nav__item--current'));
          parentItem.classList.add('nav__item--current');

          // Плавный переход к целевому элементу
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 300);

          // Фильтрация табов слайдера, если ссылка ведет к секции новостей
          if (targetId === '#news') {
            const filter = this.dataset.filter;
            const sliderFilters = document.querySelectorAll('.news__tab-item');
            const targetFilter = Array.from(sliderFilters).find((item) => item.dataset.filter === filter);

            if (targetFilter) {
              sliderFilters.forEach((item) => item.classList.remove('news__tab-item--active'));
              targetFilter.classList.add('news__tab-item--active');
              showTab(filter);
            }
          }
        }
      });
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('news__tab-item--active'));
      button.classList.add('news__tab-item--active');
      const filter = button.dataset.filter;
      showTab(filter);
    });
  });

  const defaultTab = document.querySelector('[data-name="news-tab"][data-filter="all"]');
  if (defaultTab) {
    defaultTab.classList.add('news__tab-item--active');
  }
  showTab('all');

  window.addEventListener('resize', setTallSlideClass);
  initSubMenuLinks();
}

export function initNewsFeature() {
  initTabs();
}
