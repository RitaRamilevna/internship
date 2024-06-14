import { menuOpen } from './modules/menu-open';
import { initNavigationToggle } from './modules/init-navigation-toggle';
import { initHeroSlider } from './modules/init-hero-slider';
import { initProgramsSlider } from './modules/init-program-slider';
import { initNewsFeature } from './modules/init-news-slider';
import { initialAccordion } from './modules/init-accordions';
import { initReviewsSlider } from './modules/init-reviews-slider';
import { initModal } from './modules/init-modal';
import { initCustomSelect } from './modules/init-select';
import { validateForm } from './modules/form-validate';

window.addEventListener('DOMContentLoaded', () => {
  menuOpen();
  initialAccordion();
  initNavigationToggle();
  initHeroSlider();
  initProgramsSlider();
  initNewsFeature();
  initReviewsSlider();
  initCustomSelect();
  validateForm();
  initModal();
});
