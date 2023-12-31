function showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.toggle('popup__input-error_active', true);
    inputElement.classList.toggle('popup__input_err', true);
}

function hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.toggle('popup__input-error_active', false);
    inputElement.classList.toggle('popup__input_err', false);
    errorElement.textContent = '';
}

export const cleanErrors = (formElement) => {
    const errorElements = formElement.querySelectorAll('.popup__input_err');
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
    const listInputs = formElement.querySelectorAll('.popup__input');
    listInputs.forEach((errorElement) => {
        errorElement.classList.remove('popup__input_err')
    })
};

export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.value = '';
    });
};

const checkInputValidity = (formElement, inputElement) => {
    inputElement.validity.valid
        ? hideError(formElement, inputElement)
        : showError(formElement, inputElement, inputElement.validationMessage);
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

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
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));  
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
        buttonElement.classList.add('popup__button_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__button_inactive');
        buttonElement.removeAttribute('disabled');
    };
};