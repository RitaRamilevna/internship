import { initPhoneInput } from './init-phone-input';

export const validateForm = async () => {
  const forms = document.querySelectorAll('.form__form');

  forms.forEach((form) => {
    const nameInput = form.querySelector('.form__input-name');
    const phoneInput = form.querySelector('.form__input-phone');
    const messageInput = form.querySelector('.form__input-message');
    const privacyCheckbox = form.querySelector('.form__input-checkbox');
    const citySelect = form.querySelector('.form__select-list');
    const cityInput = form.querySelector('input[name="city"]');

    if (phoneInput) {
      initPhoneInput(phoneInput.closest('.form__item'));
    }

    const validateName = () => {
      if (nameInput) {
        const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
        const isValidName = nameRegex.test(nameInput.value.trim());
        const nameField = nameInput.closest('.form__item');

        if (isValidName) {
          nameField.classList.remove('form__item--invalid');
          nameInput.setCustomValidity('');
        } else {
          nameField.classList.add('form__item--invalid');
          nameInput.setCustomValidity('Пожалуйста, введите корректное имя (только буквы, дефисы и пробелы).');
        }
      }
    };

    const validatePhone = () => {
      if (phoneInput) {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
        const isValidPhone = phoneRegex.test(phoneInput.value);
        const phoneField = phoneInput.closest('.form__item');

        if (isValidPhone) {
          phoneField.classList.remove('form__item--invalid');
          phoneInput.setCustomValidity('');
        } else {
          phoneField.classList.add('form__item--invalid');
          phoneInput.setCustomValidity('Пожалуйста, введите корректный номер телефона.');
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
      if (cityInput) {
        const cityField = cityInput.closest('.form__item-select');
        if (cityInput.value === 'empty') {
          cityField.classList.add('form__item--invalid');
          cityInput.setCustomValidity('Пожалуйста, выберите город.');
        } else {
          cityField.classList.remove('form__item--invalid');
          cityInput.setCustomValidity('');
        }
      }
    };

    const handleInvalid = (event) => {
      event.preventDefault();
      const field = event.target.closest('.form__item');
      if (field) {
        field.classList.add('form__item--invalid');
      }
    };

    const attachValidationEvents = () => {
      if (nameInput) {
        nameInput.addEventListener('input', validateName);
        nameInput.addEventListener('invalid', handleInvalid);
      }
      if (phoneInput) {
        phoneInput.addEventListener('blur', validatePhone);
        phoneInput.addEventListener('invalid', handleInvalid);
      }
      if (messageInput) {
        messageInput.addEventListener('input', validateMessage);
        messageInput.addEventListener('invalid', handleInvalid);
      }
      if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', validatePrivacy);
        privacyCheckbox.addEventListener('invalid', handleInvalid);
      }
      if (citySelect) {
        citySelect.addEventListener('click', (event) => {
          const selectedCity = event.target.dataset.value;
          if (selectedCity) {
            cityInput.value = selectedCity;
            validateCity();
          } else {
            handleInvalid(event);
          }
        });
      }
    };

    form.addEventListener('submit', (event) => {
      validateName();
      validatePhone();
      validateMessage();
      validatePrivacy();
      validateCity();

      if (form.checkValidity() === false) {
        event.preventDefault();
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach((field) => {
          const formItem = field.closest('.form__item');
          if (formItem) {
            formItem.classList.add('form__item--invalid');
          }
        });
      }
    });

    attachValidationEvents();
  });
};
