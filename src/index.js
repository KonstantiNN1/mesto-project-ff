import './index.css';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { pushInfo, getUserInfo, getCards, postCard, pushAvatar} from './components/api.js'
import { createCard, handleLikeClick, handleDeleteClick } from './components/card.js'
import { add } from 'lodash';

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
const editSubmitButton = editForm.querySelector('.popup__button')
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addForm = document.forms['new-place'];
const cardNameInput = addForm.elements.place;
const cardLinkInput = addForm.elements.link;
const addSubmitButton = addForm.querySelector('.popup__button')

const avatarForm = document.forms['new-avatar'];
const avatarInput = avatarForm.elements.link;
const avatarSubmitButton = avatarForm.querySelector('.popup__button')

const elementsContainer = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const imageImagePopup = imagePopup.querySelector('.popup__image');
const captionImagePopup = imagePopup.querySelector('.popup__caption');
const closingImagePopup = imagePopup.querySelector('.popup__close');

const profileAvatar = document.querySelector('.profile__image')
const openPhotoAvatar = document.querySelector('.profile__image-container');
const avatarPopup = document.querySelector('.popup_type_avatar');
const closingAvatarPopup = avatarPopup.querySelector('.popup__close');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputField: '.popup__fieldset',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_err',
    errorClass: 'popup__input-error_active',
}; 

let userId = ''

//функция обновления информации профиля 
function editInfo(evt) {
    evt.preventDefault();
    const newInfo = {
        name: profileNameInput.value,
        about: profileDescriptionInput.value
    };
    editSubmitButton.textContent = 'Сохранение...';
    pushInfo(newInfo)
    .then((newInfo) => {
        profileTitle.textContent = newInfo.name;
        profileDescription.textContent = newInfo.about;
        closePopup(editingPopup);
        clearValidation(editingPopup, validationConfig)
    })
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        editSubmitButton.textContent = "Сохранить";
    });
}

// функция обновления аватара
function editAvatar(evt) {
    evt.preventDefault();
    const avatar = avatarInput.value;
    avatarSubmitButton.textContent = 'Сохранение...';
    pushAvatar(avatar)
    .then((newAvatar) => {
        profileAvatar.style['background-image'] = `url(${newAvatar.avatar})`;
        closePopup(avatarPopup);
        clearValidation(avatarPopup, validationConfig);
    })
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
    })
}

//обновление попапа с профилем и аватара по сабмиту
editForm.addEventListener('submit', editInfo);
avatarForm.addEventListener('submit', editAvatar);

// сабмит добавления карточки, созданной с помощью попапа
addForm.addEventListener('submit', function() {
    addSubmitButton.textContent = 'Сохранение...';
    const cardInfo = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    postCard(cardInfo)
    .then((data) => {
        const newCard = {
            name: cardInfo.name,
            link: cardInfo.link,
            likes: data.likes,
            _id: data._id,
            owner: {
                _id: userId
            }
        }
        const newCardElement = createCard(newCard, { handleLikeClick, handleDeleteClick, handleImageClick }, userId);
        elementsContainer.prepend(newCardElement);
        closePopup(addingPopup);
        addForm.reset();
        clearValidation(addingPopup, validationConfig);
    })
    .catch(error => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        addSubmitButton.textContent = "Сохранить";
    });
})

// добавление исходных карточек
function addCards(arr) {
    arr.forEach((item) => {
      elementsContainer.append(createCard(item, { handleLikeClick, handleDeleteClick, handleImageClick }, userId));
    });
};

// открытие попапа приблежения
function handleImageClick(photo, card) {
    photo.addEventListener('click', function() {
        imageImagePopup.src = card.link;
        imageImagePopup.alt = card.name;
        captionImagePopup.textContent = card.name;
        openPopup(imagePopup);
        });
};

// открытие попапа с профилем по нажатию на кнопку
editingButton.addEventListener('click', function() {
    openPopup(editingPopup);
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
});

// закрытие попапа с профилем (без сабмита)
closingEditButton.addEventListener('click', function() {
    closePopup(editingPopup);
    clearValidation(editingPopup, validationConfig)
});

// открытие попапа добавления карточки
addingButton.addEventListener('click', function() {
    openPopup(addingPopup);
});

// закрытие попапа добавление карточки (без сабмита)
closingAddButton.addEventListener('click', function() {
    closePopup(addingPopup);
    clearValidation(addingPopup, validationConfig)
});

// закрытие попапа увелечения карточки (без сабмита)
closingImagePopup.addEventListener('click', function() {
    closePopup(imagePopup);
});

// открытие попапа изменения аватара
openPhotoAvatar.addEventListener('click', function() {
    openPopup(avatarPopup);
});

// закрытие попапа изменения аватара
closingAvatarPopup.addEventListener('click', function() {
    closePopup(avatarPopup);
    clearValidation(avatarPopup, validationConfig)       
});
// валидация
clearValidation(addingPopup, validationConfig);
enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url("${userInfo.avatar}")`;
    userId = userInfo._id;
    addCards(cards);
    console.log(cards)
  })
  .catch((error) => {
        console.log(`Ошибка при получении данных: ${error.message}`);
  })
  