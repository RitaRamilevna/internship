import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export function initHeroSlider() {
  const heroSwiper = new Swiper('.hero__swiper', {
    modules: [Autoplay, Pagination, EffectFade],
    loop: true,
    grabCursor: true,
    autoHeight: true,
    speed: 1500,
    effect: 'fade',
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1440: {
        grabCursor: false,
        allowTouchMove: false,
      },
      768: {
        allowTouchMove: true,
      },
      320: {
        allowTouchMove: true,
      },
    },
    pagination: {
      el: '.swiper-slide-active .hero__pagination',
      clickable: true,
      watchSlidesProgress: true,
      renderBullet: function (index, className) {
        return `<button class="${className}" aria-label="Перейти к слайду ${index + 1}" tabindex="0"></button>`;
      },
    },
    on: {
      slideChangeTransitionStart: function () {
        heroSwiper.pagination.init();
        heroSwiper.pagination.render();
        heroSwiper.pagination.update();
      }
    }
  });
  return heroSwiper;
}
