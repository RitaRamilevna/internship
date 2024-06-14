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

        cityButton.classList.add('form__select-button--empty');

        if (cityButton.classList.contains('form__select-button-light')) {
          cityButton.innerHTML = '<span class="visually-hidden">Город не выбран</span>';
        }
      } else {
        cityButton.setCustomValidity('');
        citySelect.classList.remove('form__select-wrapper--invalid');
        citySelect.closest('.form__item, .modal__item, .form__item-select').classList.remove('form__item--invalid');

        cityButton.classList.remove('form__select-button--empty');

        if (cityButton.classList.contains('form__select-button-light')) {
          cityButton.textContent = cityButton.textContent.replace('Город не выбран', '').trim();
        }
      }
      return isValidCity;
    };

    const validateAllFields = () => {
      validateName();
      validatePhone();
      validateMessage();
      validatePrivacy();
      validateCity();
    };

    if (nameInput) {
      nameInput.addEventListener('input', validateName);
    }

    if (phoneInput) {
      initPhoneInput(phoneInput);
      phoneInput.addEventListener('input', validatePhone);
    }

    if (messageInput) {
      messageInput.addEventListener('input', validateMessage);
    }

    if (privacyCheckbox) {
      privacyCheckbox.addEventListener('change', validatePrivacy);
    }

    if (cityButton) {
      cityButton.addEventListener('click', validateCity);
    }

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateAllFields();

        if (form.checkValidity() && (!citySelect || validateCity())) {
          const formData = new FormData(form);

          fetch(form.action, {
            method: 'POST',
            body: formData
          })
            .then((response) => {
              if (response.ok) {
                showMessage('Форма успешно отправлена', 'success');

                const modal = form.closest('.modal');
                if (modal) {
                  modal.classList.remove('modal--open');
                  modal.classList.add('modal--close');
                }

                window.location.href = '/';
              } else {
                showMessage('Ошибка отправки формы', 'error');
              }
            })
            .catch(() => {
              showMessage('Ошибка при отправке формы', 'error');
            });
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

function showMessage(message, type) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message', `message--${type}`);
  messageContainer.textContent = message;

  document.body.appendChild(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}
