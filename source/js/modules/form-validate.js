import { initPhoneInput } from './init-phone-input';

export const validateForm = () => {
  const forms = document.querySelectorAll('.form__form');

  forms.forEach((form) => {
    const nameInput = form.querySelector('.form__input-name');
    const phoneInput = form.querySelector('.form__input-phone');
    const messageInput = form.querySelector('.form__input-message');
    const privacyCheckbox = form.querySelector('.form__input-checkbox');
    const citySelect = form.querySelector('.form__select-wrapper');
    const submitButton = form.querySelector('button[type="submit"]');
    const cityButton = form.querySelector('.form__select-button, .form__select-button-light');

    const validateName = () => {
      if (nameInput) {
        const isValidName = nameInput.value.trim() !== '';
        const nameField = nameInput.closest('.form__item');

        if (isValidName) {
          nameField.classList.remove('form__item--invalid');
          nameInput.setCustomValidity('');
        } else {
          nameField.classList.add('form__item--invalid');
          nameInput.setCustomValidity('Пожалуйста, введите ваше имя.');
        }
      }
    };

    const validatePhone = () => {
      if (phoneInput) {
        const phoneField = phoneInput.closest('.form__item');
        const inputNumbersValue = phoneInput.value.replace(/\D/g, '');

        if (inputNumbersValue.length === 11) {
          phoneField.classList.remove('form__item--invalid');
          phoneInput.setCustomValidity('');
        } else {
          phoneField.classList.add('form__item--invalid');
          phoneInput.setCustomValidity('Пожалуйста, введите корректный номер телефона.');
          phoneInput.title = 'Пожалуйста, введите корректный номер телефона.';
        }
      }
    };

    const validateMessage = () => {
      if (messageInput) {
        const isValidMessage = messageInput.value.trim() !== '';
        const messageField = messageInput.closest('.form__item');

        if (isValidMessage) {
          messageField.classList.remove('form__item--invalid');
          messageInput.setCustomValidity('');
        } else {
          messageField.classList.add('form__item--invalid');
          messageInput.setCustomValidity('Пожалуйста, введите ваше сообщение.');
        }
      }
    };

    const validatePrivacy = () => {
      if (privacyCheckbox) {
        const privacyField = privacyCheckbox.closest('.form__item');
        if (privacyCheckbox.checked) {
          privacyField.classList.remove('form__item--invalid');
          privacyCheckbox.setCustomValidity('');
        } else {
          privacyField.classList.add('form__item--invalid');
          privacyCheckbox.setCustomValidity('Необходимо дать согласие на обработку персональных данных.');
        }
      }
    };

    const validateCity = () => {

      const isValidCity = cityButton && cityButton.textContent.trim() !== 'Город не выбран';

      if (!isValidCity) {
        cityButton.setCustomValidity('Пожалуйста, выберите город.');
        citySelect.classList.add('form__select-wrapper--invalid');
        citySelect.closest('.form__item, .modal__item, .form__item-select').classList.add('form__item--invalid');
      } else {
        cityButton.setCustomValidity('');
        citySelect.classList.remove('form__select-wrapper--invalid');
        citySelect.closest('.form__item, .modal__item, .form__item-select').classList.remove('form__item--invalid');
      }
      return isValidCity;
    };

    const validateAllFields = () => {
      if (nameInput) {
        if (!validateName()) {
          nameInput.closest('.form__item').classList.add('form__item--invalid');
        } else {
          nameInput.closest('.form__item').classList.remove('form__item--invalid');
        }
      }

      if (phoneInput) {
        if (!validatePhone()) {
          phoneInput.closest('.form__item').classList.add('form__item--invalid');
        } else {
          phoneInput.closest('.form__item').classList.remove('form__item--invalid');
        }
      }

      if (messageInput) {
        if (!validateMessage()) {
          messageInput.closest('.form__item').classList.add('form__item--invalid');
        } else {
          messageInput.closest('.form__item').classList.remove('form__item--invalid');
        }
      }

      if (privacyCheckbox) {
        if (!validatePrivacy()) {
          privacyCheckbox.closest('.form__item').classList.add('form__item--invalid');
        } else {
          privacyCheckbox.closest('.form__item').classList.remove('form__item--invalid');
        }
      }

      if (citySelect) {
        if (!validateCity()) {
          citySelect.closest('.form__item, .modal__item, .form__item-select').classList.add('form__item--invalid');
        } else {
          citySelect.closest('.form__item, .modal__item, .form__item-select').classList.remove('form__item--invalid');
        }
      }
    };


    if (phoneInput) {
      initPhoneInput(phoneInput);
      phoneInput.addEventListener('input', validatePhone);
    }

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateAllFields();

        if (form.checkValidity() && (!citySelect || validateCity())) {
          form.submit();
        } else {
          form.reportValidity();
        }
      });
    }

    if (submitButton) {
      submitButton.addEventListener('click', (event) => {
        validateAllFields();
        if (!form.checkValidity() || !validateCity()) {
          event.preventDefault();
          form.reportValidity();
        }
      });
    }
  });
};
