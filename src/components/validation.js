// function restrictedSymbols(inputElement) {
//     const shouldBe = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
//     return shouldBe.test(inputElement.value) 
// }

function showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add('error_active');
    inputElement.classList.add('popup__input_err');
    // if (!restrictedSymbols(inputElement)) {
    //     errorElement.textContent = 'Оба поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы';
    // } else {
        errorElement.textContent = errorMessage;
    // }
}

function hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_err');
    errorElement.classList.remove('error_active');
    // if (restrictedSymbols(inputElement)) {
    //     errorElement.textContent = ''
    // } else {
        errorElement.textContent = '';
    // }
}

export const cleanErrors = (formElement) => {
    const errorElements = formElement.querySelectorAll('.input__error');
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
    const listInputs = formElement.querySelectorAll('.popup__input');
    listInputs.forEach((errorElement) => {
        errorElement.classList.remove('popup__input_err')
    })
};

export const cleanInputs = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.value = '';
    });
};


const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    };
  };

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
        buttonElement.addEventListener('input', function() {
            toggleButtonState(inputList, buttonElement);
        });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));  
    fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('button_inactive');
        buttonElement.removeAttribute('disabled');
    };
};