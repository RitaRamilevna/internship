import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
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

    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        autoHeight: true,
        scrollbar: {
          hide: true,
          el: '',
          enabled: false,
        },
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        scrollbar: {
          dragSize: 324,
        },
      },
      // when window width is >= 1440px
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
        scrollbar: {
          dragSize: 392,
        },
      },
    },
  });

  return programsSlider;

}
