export function initCustomSelect() {
  const selectButton = document.querySelector('.form__select-button');
  const selectList = document.querySelector('.form__select-list');
  const selectItems = document.querySelectorAll('.form__select-item');
  const emptyOption = selectList.querySelector('.form__select-item--empty');
  const hiddenInput = document.querySelector('input[name="city"]');
  const form = document.querySelector('.form__form');

  selectButton.addEventListener('click', () => {
    selectList.classList.toggle('form__select-list--selected');
    selectButton.classList.toggle('form__select-button--selected');
    selectButton.setAttribute('aria-expanded', selectButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });

  selectItems.forEach((selectItem) => {
    selectItem.addEventListener('click', () => {
      if (selectItem === emptyOption) {
        selectButton.textContent = '';
        hiddenInput.value = '';
      } else {
        selectButton.textContent = selectItem.textContent;
        hiddenInput.value = selectItem.dataset.value;
      }
      selectItems.forEach((item) => item.classList.remove('form__select-item--selected'));
      selectItem.classList.add('form__select-item--selected');
      selectList.classList.remove('form__select-list--selected');
      selectButton.classList.remove('form__select-button--selected');
      selectButton.setAttribute('aria-expanded', 'false');
    });

    selectItem.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        selectItem.click();
      }
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInside = selectList.contains(event.target) || selectButton.contains(event.target);
    if (!isClickInside) {
      selectList.classList.remove('form__select-list--selected');
      selectButton.classList.remove('form__select-button--selected');
      selectButton.setAttribute('aria-expanded', 'false');
    }
  });

  form.addEventListener('submit', (event) => {
    if (hiddenInput.value === '' || hiddenInput.value === 'empty') {
      event.preventDefault();
      selectButton.closest('.form__item').classList.add('form__item--invalid');
      selectButton.setCustomValidity('Пожалуйста, выберите город.');
    } else {
      selectButton.setCustomValidity('');
    }
  });
}
