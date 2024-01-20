function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.toggle(config.errorClass, true);
    inputElement.classList.toggle(config.inputErrorClass, true);
}

function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.toggle(config.errorClass, false);
    inputElement.classList.toggle(config.inputErrorClass, false);
    errorElement.textContent = '';
}

export const cleanErrors = (formElement, config) => {
    const errorElements = formElement.querySelectorAll(config.inputErrorClass);
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
    const listInputs = formElement.querySelectorAll(config.inputSelector);
    listInputs.forEach((inputElement) => {
        inputElement.classList.remove(config.inputErrorClass);
    });
};

export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.value = '';
    });
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    buttonElement.classList.add(config.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, config);
    });
};

const checkInputValidity = (formElement, inputElement, config) => {
    inputElement.validity.valid
        ? hideError(formElement, inputElement, config)
        : showError(formElement, inputElement, inputElement.validationMessage, config);
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    if (buttonElement) {
        buttonElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement, config);
        });
    }

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(config.inputField));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, config);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};