export function initCustomSelect() {
  const forms = document.querySelectorAll('.form__form');

  forms.forEach((form) => {
    const selectButtons = form.querySelectorAll('.form__select-button');
    const selectLists = form.querySelectorAll('.form__select-list');
    const selectItems = form.querySelectorAll('.form__select-item');
    const hiddenInputs = form.querySelectorAll('input[name="city"]');

    selectButtons.forEach((selectButton, index) => {
      const selectList = selectLists[index];
      const hiddenInput = hiddenInputs[index];
      const emptyOption = selectList.querySelector('.form__select-item--empty');

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
    });
  });
}
