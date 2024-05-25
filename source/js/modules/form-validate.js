const validateForm = async () => {
  const form = document.querySelector('.form__form');
  const phoneInput = document.querySelector('.form__input-phone');
  const emailInput = document.querySelector('.form__input-email');
  const phoneLabel = document.querySelector('.form__label-phone');
  const emailLabel = document.querySelector('.form__label-email');

  const validateInputs = () => {
    let isValid = true;

    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^[^a-zа-яё]*$/i;
    if (!phoneRegex.test(phoneValue)) {
      isValid = false;
      phoneInput.classList.add('form__input-invalid');
    } else {
      phoneInput.classList.remove('form__input-invalid');
    }

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+(\w{2,}|xn--p1ai)$/;
    if (!emailRegex.test(emailValue)) {
      isValid = false;
      emailInput.classList.add('form__input-invalid');
    } else {
      emailInput.classList.remove('form__input-invalid');
    }

    return isValid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateInputs()) {
      form.submit();
    }
  });

  phoneInput.addEventListener('focus', () => {
    phoneLabel.classList.add('form__label--focus');
  });
  phoneInput.addEventListener('blur', () => {
    if (phoneInput.value.trim() === '') {
      phoneLabel.classList.remove('form__label--focus');
    }
  });

  emailInput.addEventListener('focus', () => {
    emailLabel.classList.add('form__label--focus');
  });
  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
      emailLabel.classList.remove('form__label--focus');
    }
  });
};

export { validateForm };
