import './index.css';
import { initialCards } from './components/cards.js';
import { createCard, addCard, deleteCard, toggleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// константы 
const editingPopup = document.querySelector('.popup_type_edit');
const editingButton = document.querySelector('.profile__edit-button');
const addingPopup = document.querySelector('.popup_type_new-card');
const addingButton = document.querySelector('.profile__add-button');
const closingEditButton = editingPopup.querySelector('.popup__close');
const closingAddButton = addingPopup.querySelector('.popup__close');

const editForm = document.forms['edit-profile'];
const profileNameInput = editForm.elements.name;
const profileDescriptionInput = editForm.elements.description;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const places = document.querySelector('.places');

const addForm = document.forms['new-place'];
const cardNameInput = addForm.elements.place;
const cardLinkInput = addForm.elements.link;

export const elementsTemplate = document.querySelector('#card-template');
export const elementsContainer = document.querySelector('.places__list');

// функция работы с профилем 
function editInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(editingPopup);
}

// обновление попапа с профилем по сабмиту
editForm.addEventListener('submit', editInfo);

// открытие попапа с профилем по нажатию на кнопку
editingButton.addEventListener('click', function() {
    openPopup(editingPopup);
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
});

// закрытие попапа с профилем (без сабмита)
closingEditButton.addEventListener('click', function() {
    closePopup(editingPopup);
});

// открытие попапа добавления карточки
addingButton.addEventListener('click', function() {
    openPopup(addingPopup);
});

// закрытие попапа добавление карточки (без сабмита)
closingAddButton.addEventListener('click', function() {
    closePopup(addingPopup);
});

// закрытие попапа на оверлэй
export function closeByOverlay(evt) {        
    const popup = document.querySelector('.popup_is-opened');
    if (evt.target === popup) {
        closePopup(popup);
    };
};

// закрытие на escape
export function closeByEscape(evt) { 
        if (evt.key === 'Escape') {
            const popup = document.querySelector(`.popup_is-opened`);
            closePopup(popup);
        };
};

// функция добавление карточки
function addNewCard(evt) {
    evt.preventDefault();
    const newCard = {
      name: cardNameInput.value,
      link: cardLinkInput.value
    }
    const newCardElement = createCard(newCard);
    elementsContainer.prepend(newCardElement);
    closePopup(addingPopup);
    addForm.reset();
    createCard([newCard]);
}

// сабмит добавления карточки, созданной с помощью попапа
addForm.addEventListener('submit', addNewCard);

// вызов-создание встроенных карточек
addCard(initialCards);