import { validateForm } from './form-validate';

export function initModal() {
  const aboutButton = document.querySelector('.about__button');
  const modal = document.querySelector('.page-body__modal');
  const closeButton = document.querySelector('.modal__close-button');
  const modalForm = modal.querySelector('.modal__form');
  const body = document.querySelector('body');
  const messageContainer = document.createElement('div');
  messageContainer.className = 'form__message-container';
  modalForm.appendChild(messageContainer);

  aboutButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', handleModalClick);
  modalForm.addEventListener('submit', handleFormSubmit);

  function openModal() {
    modal.classList.remove('modal--close');
    modal.classList.add('modal--open');
    setTimeout(() => {
      modal.classList.add('modal--visible');
      body.style.overflow = 'hidden';
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('modal--visible');
    body.style.overflow = 'auto';
    setTimeout(() => {
      modal.classList.remove('modal--open');
      modal.classList.add('modal--close');
    }, 300);
  }

  function handleModalClick(event) {
    if (event.target === modal) {
      closeModal();
    }
  }

  function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `form__message-container form__message--${type}`;
    setTimeout(() => {
      messageContainer.textContent = '';
      messageContainer.className = 'form__message-container';
    }, 3000);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    validateForm(modalForm);
    if (modalForm.checkValidity()) {
      const formData = new FormData(modalForm);

      try {
        const response = await fetch(modalForm.action, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          showMessage('Форма успешно отправлена!', 'success');
          closeModal();
          modalForm.reset();
        } else {
          showMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.', 'error');
          const invalidFields = modalForm.querySelectorAll(':invalid');
          invalidFields.forEach((field) => {
            const formItem = field.closest('.form__item');
            if (formItem) {
              formItem.classList.add('form__item--invalid');
            }
          });
        }
      } catch (error) {
        showMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.', 'error');
      }
    }
  }
}
