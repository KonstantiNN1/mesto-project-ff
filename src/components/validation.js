const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputField: '.popup__fieldset',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_err',
    errorClass: 'popup__input-error_active',
  }; 

function showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.toggle(validationConfig.errorClass, true);
    inputElement.classList.toggle(validationConfig.inputErrorClass, true);
}

function hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.toggle(validationConfig.errorClass, false);
    inputElement.classList.toggle(validationConfig.inputErrorClass, false);
    errorElement.textContent = '';
}

export const cleanErrors = (formElement) => {
    const errorElements = formElement.querySelectorAll(validationConfig.inputErrorClass);
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
    const listInputs = formElement.querySelectorAll(validationConfig.inputSelector);
    listInputs.forEach((errorElement) => {
        errorElement.classList.remove(validationConfig.inputErrorClass)
    })
};

export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.value = '';
    });
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector,
    );
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        hideError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
        );
    });
};

const checkInputValidity = (formElement, inputElement) => {
    inputElement.validity.valid
        ? hideError(formElement, inputElement)
        : showError(formElement, inputElement, inputElement.validationMessage);
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    if (buttonElement) {
        buttonElement.addEventListener('input', function() {
            toggleButtonState(inputList, buttonElement);
        });
    }

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.inputField));  
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
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    };
};