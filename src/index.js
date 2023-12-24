import './index.css';
import { createCard, deleteCard, toggleLike, handleImageClick } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { pushInfo, getInfo, getCards, postCard, getAvatar, pushAvatar} from './components/api.js'
import { result } from 'lodash';
import { addCards } from './components/card.js';

// константы 
export const editingPopup = document.querySelector('.popup_type_edit');
const editingButton = document.querySelector('.profile__edit-button');
export const addingPopup = document.querySelector('.popup_type_new-card');
const addingButton = document.querySelector('.profile__add-button');
const closingEditButton = editingPopup.querySelector('.popup__close');
const closingAddButton = addingPopup.querySelector('.popup__close');

const editForm = document.forms['edit-profile'];
const profileNameInput = editForm.elements.name;
const profileDescriptionInput = editForm.elements.description;

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const addForm = document.forms['new-place'];
export const cardNameInput = addForm.elements.place;
export const cardLinkInput = addForm.elements.link;

export const avatarForm = document.forms['new-avatar'];
export const avatarInput = avatarForm.elements.link;

export const elementsTemplate = document.querySelector('#card-template');
export const elementsContainer = document.querySelector('.places__list');

export const imagePopup = document.querySelector('.popup_type_image');
export const imageImagePopup = imagePopup.querySelector('.popup__image');
export const captionImagePopup = imagePopup.querySelector('.popup__caption');
export const closingImagePopup = imagePopup.querySelector('.popup__close');

export const profileAvatar = document.querySelector('.profile__image')
const openPhotoAvatar = document.querySelector('.profile__image-container');
const avatarPopup = document.querySelector('.popup_type_avatar');
const closingAvatarPopup = avatarPopup.querySelector('.popup__close');


//функция работы с профилем 
function editInfo(evt) {
    evt.preventDefault();
    const newInfo = {
        name: profileNameInput.value,
        about: profileDescriptionInput.value
    };
    pushInfo(newInfo)
}

// pushAvatar(imgUrl)
//     .then((res) => {
//       avatarLink.style.backgroundImage = `url("${res.avatar}")`;
//       closePopup(avatarEditPopup);
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       avatarSubmitBtn.textContent = "Сохранить";
//     });

function editAvatar(evt) {
    evt.preventDefault();
        const avatar = avatarInput.value
    pushAvatar(avatar)
    closePopup(avatarPopup);
}


//обновление попапа с профилем по сабмиту
editForm.addEventListener('submit', editInfo);

avatarForm.addEventListener('submit', editAvatar);


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

// закрытие попапа увелечения карточки (без сабмита)
closingImagePopup.addEventListener('click', function() {
    closePopup(imagePopup);
});

// сабмит добавления карточки, созданной с помощью попапа
addForm.addEventListener('submit', postCard);

enableValidation();
getInfo(); 
getCards();
getAvatar();
// pushAvatar();

openPhotoAvatar.addEventListener('click', function() {
    openPopup(avatarPopup);
});

closingAvatarPopup.addEventListener('click', function() {
    closePopup(avatarPopup);
});
