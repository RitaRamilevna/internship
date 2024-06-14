export function initCustomSelect() {
  const forms = document.querySelectorAll('.form__form, .modal__form');

  forms.forEach((form) => {
    const selectElements = form.querySelectorAll('select[name="city"]');
    const isModalForm = form.classList.contains('modal__form');

    selectElements.forEach((selectElement) => {
      if (selectElement) {
        const existingCustomSelect = selectElement.parentElement.querySelector('.form__select-wrapper');
        if (existingCustomSelect) {
          return;
        }

        const selectLabel = selectElement.closest('.form__item, .modal__item').querySelector('.form__label-city, .modal__label-city');
        const selectItems = selectElement.querySelectorAll('option');
        const selectWrapper = document.createElement('div');
        const selectButton = document.createElement('button');
        const selectList = document.createElement('ul');

        const buttonClass = isModalForm ? 'form__select-button-light' : 'form__select-button';
        const listClass = isModalForm ? 'form__select-list-light' : 'form__select-list';

        selectWrapper.classList.add('form__select-wrapper');
        selectButton.classList.add(buttonClass);
        selectButton.setAttribute('type', 'button');
        selectButton.setAttribute('aria-haspopup', 'listbox');
        selectButton.setAttribute('aria-expanded', 'false');
        selectList.classList.add(listClass, 'list-reset');
        selectList.setAttribute('role', 'listbox');
        selectList.setAttribute('aria-hidden', 'true');
        selectButton.setAttribute('data-required', '');

        selectButton.customSelect = selectElement;

        selectItems.forEach((option, index) => {
          const selectItem = document.createElement('li');
          selectItem.classList.add('form__select-item');
          selectItem.setAttribute('tabindex', '0');
          selectItem.setAttribute('role', 'option');
          selectItem.setAttribute('aria-selected', 'false');
          if (option.value !== null && option.value !== '') {
            selectItem.dataset.value = option.value;
          } else {
            selectItem.dataset.value = 'empty';
          }
          if (option.value === 'empty') {
            selectItem.classList.add('form__select-item--empty');
            selectItem.innerHTML = '<span class="visually-hidden">Город не выбран</span>';
          } else {
            selectItem.textContent = option.textContent;
          }

          if (index === 0) {
            selectButton.innerHTML = '<span class="visually-hidden">Город не выбран</span>';
            selectItem.classList.add('form__select-item--selected');
            selectItem.setAttribute('aria-selected', 'true');
          }

          selectList.appendChild(selectItem);

          selectItem.addEventListener('click', () => {
            const selectedOption = selectElement.options[index];
            selectButton.innerHTML = selectedOption.textContent || '<span class="visually-hidden">Город не выбран</span>';
            selectElement.value = selectedOption.value;
            selectList.querySelectorAll('.form__select-item').forEach((item) => item.classList.remove('form__select-item--selected'));
            selectItem.classList.add('form__select-item--selected');
            selectList.querySelectorAll('.form__select-item').forEach((item) => item.setAttribute('aria-selected', 'false'));
            selectItem.setAttribute('aria-selected', 'true');
            selectList.classList.remove('form__select-list--selected');
            if (isModalForm) {
              selectList.classList.remove('form__select-list-light--selected');
            }
            selectButton.classList.remove('form__select-button--selected');
            if (isModalForm) {
              selectButton.classList.remove('form__select-button-light--selected');
            }
            selectButton.setAttribute('aria-expanded', 'false');

            const cityField = selectButton.closest('.form__item, .modal__item');
            cityField.classList.remove('form__item--invalid');
          });

          selectItem.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              selectItem.click();
            }
          });
        });

        selectWrapper.appendChild(selectButton);
        selectWrapper.appendChild(selectList);
        selectLabel.insertAdjacentElement('afterend', selectWrapper);

        selectButton.addEventListener('click', () => {
          selectList.classList.toggle('form__select-list--selected');
          if (isModalForm) {
            selectList.classList.toggle('form__select-list-light--selected');
          }
          selectButton.classList.toggle('form__select-button--selected');
          if (isModalForm) {
            selectButton.classList.toggle('form__select-button-light--selected');
          }
          selectButton.setAttribute('aria-expanded', selectButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');

        });

        document.addEventListener('click', (event) => {
          const isClickInside = selectWrapper.contains(event.target);
          if (!isClickInside) {
            selectList.classList.remove('form__select-list--selected');
            if (isModalForm) {
              selectList.classList.remove('form__select-list-light--selected');
            }
            selectButton.classList.remove('form__select-button--selected');
            if (isModalForm) {
              selectButton.classList.remove('form__select-button-light--selected');
            }
            selectButton.setAttribute('aria-expanded', 'false');
          }
        });

        selectElement.addEventListener('invalid', () => {
          const cityField = selectElement.closest('.form__item, .modal__item, .form__item-select');
          cityField.classList.add('form__item--invalid');
          selectWrapper.classList.add('form__select-wrapper--invalid');
          selectWrapper.dataset.errorMessage = 'Пожалуйста, выберите город.';
          selectElement.setCustomValidity('Пожалуйста, выберите город.');
        });

        selectElement.addEventListener('change', () => {
          const cityField = selectElement.closest('.form__item, .modal__item, .form__item-select');
          cityField.classList.remove('form__item--invalid');
          selectWrapper.classList.remove('form__select-wrapper--invalid');
          delete selectWrapper.dataset.errorMessage;
          selectElement.setCustomValidity('');
        });

        selectButton.addEventListener('focus', () => {
          if (selectWrapper.classList.contains('form__select-wrapper--invalid')) {
            selectButton.classList.add('form__select-button--invalid');
            const errorMessage = selectWrapper.dataset.errorMessage;
            if (errorMessage) {
              const errorElement = document.createElement('div');
              errorElement.classList.add('form__error-message');
              errorElement.textContent = errorMessage;
              selectWrapper.appendChild(errorElement);
            }
          }
        });

        selectButton.addEventListener('blur', () => {
          selectButton.classList.remove('form__select-button--invalid');
          const errorElement = selectWrapper.querySelector('.form__error-message');
          if (errorElement) {
            errorElement.remove();
          }
        });

      }
    });
  });
}
