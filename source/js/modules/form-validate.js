import { initPhoneInput } from './init-phone-input';

export const validateForm = async () => {
  const form = document.querySelector('.form__form');
  const nameInput = form.querySelector('.form__input-name');
  const phoneInput = form.querySelector('.form__input-phone');
  const messageInput = form.querySelector('.form__input-message');
  const privacyCheckbox = form.querySelector('.form__input-checkbox');
  const citySelect = form.querySelector('.form__select-list');
  const cityInput = form.querySelector('input[name="city"]');

  initPhoneInput(phoneInput.closest('.form__item'));

  const invalidFields = form.querySelectorAll('.form__item--invalid');
  invalidFields.forEach((field) => field.classList.remove('form__item--invalid'));

  const validateInputs = () => {
    let isValid = true;

    const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
    const isValidName = nameRegex.test(nameInput.value.trim());
    const nameField = nameInput.closest('.form__item');

    if (isValidName) {
      nameField.classList.remove('form__item--invalid');
      nameInput.setCustomValidity('');
    } else {
      nameField.classList.add('form__item--invalid');
      nameInput.setCustomValidity('Пожалуйста, введите корректное имя (только буквы, дефисы и пробелы).');
      isValid = false;
    }

    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
    const isValidPhone = phoneRegex.test(phoneInput.value);
    const phoneField = phoneInput.closest('.form__item');

    if (isValidPhone) {
      phoneField.classList.remove('form__item--invalid');
      phoneInput.setCustomValidity('');
    } else {
      phoneField.classList.add('form__item--invalid');
      phoneInput.setCustomValidity('Пожалуйста, введите корректный номер телефона.');
      isValid = false;
    }

    const isValidMessage = messageInput.value.trim() !== '';
    const messageField = messageInput.closest('.form__item');

    if (isValidMessage) {
      messageField.classList.remove('form__item--invalid');
      messageInput.setCustomValidity('');
    } else {
      messageField.classList.add('form__item--invalid');
      messageInput.setCustomValidity('Пожалуйста, введите ваше сообщение.');
      isValid = false;
    }

    const privacyField = privacyCheckbox.closest('.form__item');
    if (privacyCheckbox.checked) {
      privacyField.classList.remove('form__item--invalid');
      privacyCheckbox.setCustomValidity('');
    } else {
      privacyField.classList.add('form__item--invalid');
      privacyCheckbox.setCustomValidity('Необходимо дать согласие на обработку персональных данных.');
      isValid = false;
    }

    const cityField = cityInput.closest('.form__item');
    if (cityInput.value.trim() === '') {
      cityField.classList.add('form__item--invalid');
      cityInput.setCustomValidity('Пожалуйста, выберите город.');
      isValid = false;
    } else {
      cityField.classList.remove('form__item--invalid');
      cityInput.setCustomValidity('');
    }

    return isValid;
  };

  const attachValidationEvents = () => {
    nameInput.addEventListener('input', validateInputs);
    phoneInput.addEventListener('blur', validateInputs);
    messageInput.addEventListener('input', validateInputs);
    privacyCheckbox.addEventListener('change', validateInputs);
    citySelect.addEventListener('click', (event) => {
      const selectedCity = event.target.dataset.value;
      cityInput.value = selectedCity !== 'empty' ? selectedCity : '';
      validateInputs();
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateInputs()) {
      form.submit();
    }
  });

  attachValidationEvents();
};
