import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

export function initProgramsSlider() {
  const programsSlider = new Swiper('.programs__swiper', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',

    grabCursor: true,
    draggable: true,
    speed: 500,
    autoplay: false,

    navigation: {
      nextEl: '.programs__button-navigation--next',
      prevEl: '.programs__button-navigation--prev',
    },

    scrollbar: {
      grabCursor: true,
      draggable: true,
      allowTouchMove: true,
      el: '.programs__scrollbar',
      dragSize: 'auto',
    },

    on: {
      init: function () {
        const scrollbar = this.scrollbar;
        const slidesCount = this.slides.length;
        const minScrollbarWidth = this.params.minScrollbarWidth || 0;
        const scrollbarSize = Math.max(this.width / slidesCount, minScrollbarWidth);
        scrollbar.dragSize = scrollbarSize;
        scrollbar.updateSize();
      },
      slideChange: function () {
        const scrollbar = this.scrollbar;
        const progress = this.progress;
        scrollbar.updateSize();
        scrollbar.setTranslate(progress * (this.width - scrollbar.dragSize));

        if (this.isEnd) {
          scrollbar.setTranslate(this.width - scrollbar.dragSize);
        }
      },
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        autoHeight: true,
        scrollbar: {
          hide: true,
          el: '',
          enabled: false,
        },
        minScrollbarWidth: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        minScrollbarWidth: 326,
      },
      1440: {
        grabCursor: false,
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
        minScrollbarWidth: 394,
      },
    },
  });

  return programsSlider;
}
