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
}

export function initNewsFeature() {
  initTabs();
}
