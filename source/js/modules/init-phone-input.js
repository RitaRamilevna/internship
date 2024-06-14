const initPhoneInput = (inputElement) => {
  const onPhoneInputInput = () => {
    let inputNumbersValue = inputElement.value.replace(/\D/g, '');
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      return (inputElement.value = '');
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = `7${inputNumbersValue}`;
      }

      const firstSymbols = (inputNumbersValue[0] === '8') ? '+7' : '+7';
      formattedInputValue = `${firstSymbols} `;

      if (inputNumbersValue.length > 1) {
        formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += ` ${inputNumbersValue.substring(7, 9)}`;
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += ` ${inputNumbersValue.substring(9, 11)}`;
      }
    } else {
      formattedInputValue = `+7 ${inputNumbersValue.substring(0, 10)}`;
    }

    inputElement.value = formattedInputValue;
  };

  const onPhoneInputFocus = () => {
    if (!inputElement.value) {
      inputElement.value = '+7';
    }
  };

  const onPhoneInputKeyDown = (event) => {
    if (event.keyCode === 8 && inputElement.value.length === 2) {
      inputElement.value = '';
    }
  };

  const onPhoneInputPaste = () => {
    const pasted = window.clipboardData || window.clipboardData;
    const inputNumbersValue = inputElement.value.replace(/\D/g, '');

    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        inputElement.value = inputNumbersValue;
      }
    }
  };

  inputElement.addEventListener('input', onPhoneInputInput);
  inputElement.addEventListener('focus', onPhoneInputFocus);
  inputElement.addEventListener('keydown', onPhoneInputKeyDown);
  inputElement.addEventListener('paste', onPhoneInputPaste);
};

export { initPhoneInput };
