import './index.css';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { pushInfo, getUserInfo, getCards, postCard, pushAvatar} from './components/api.js'
import { createCard, toggleLike, deleteCard } from './components/card.js'
import { add } from 'lodash';

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
export const editSubmitButton = editForm.querySelector('.popup__button')
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const addForm = document.forms['new-place'];
export const cardNameInput = addForm.elements.place;
export const cardLinkInput = addForm.elements.link;
export const addSubmitButton = addForm.querySelector('.popup__button')


export const avatarForm = document.forms['new-avatar'];
export const avatarInput = avatarForm.elements.link;
export const avatarSubmitButton = avatarForm.querySelector('.popup__button')


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

export let userId = ''

//функция обновления информации профиля 
function editInfo(evt) {
    evt.preventDefault();
    const newInfo = {
        name: profileNameInput.value,
        about: profileDescriptionInput.value
    };
    pushInfo(newInfo)
    .then((newInfo) => {
        profileTitle.textContent = newInfo.name;
        profileDescription.textContent = newInfo.about;
        closePopup(editingPopup);
        clearValidation(editingPopup)
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
    pushAvatar(avatar)
    .then((newAvatar) => {
        profileAvatar.style['background-image'] = `url(${newAvatar.avatar})`;
        closePopup(avatarPopup);
        clearValidation(avatarPopup);
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
    postCard()
    .then(() => {
        const newCard = {
            name: cardNameInput.value,
            link: cardLinkInput.value,
            likes: [],
            _id: '',
            owner: {
                _id: userId
            }
        }
        const newCardElement = createCard(newCard, { toggleLike, deleteCard, handleImageClick });
        elementsContainer.prepend(newCardElement);
        closePopup(addingPopup);
        addForm.reset();
        clearValidation(addingPopup);
    })
    .catch(error => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        addSubmitButton.textContent = "Сохранить";
    });
    
})

function addCards(arr) {
    arr.forEach((item) => {
      elementsContainer.append(createCard(item, { toggleLike, deleteCard, handleImageClick }));
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
    clearValidation(editingPopup)
});

// открытие попапа добавления карточки
clearValidation(addingPopup)
addingButton.addEventListener('click', function() {
    openPopup(addingPopup);
});

// закрытие попапа добавление карточки (без сабмита)
closingAddButton.addEventListener('click', function() {
    closePopup(addingPopup);
    clearValidation(addingPopup)
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
    clearValidation(avatarPopup)
          
});

export function handleImageClick(photo, card) {
    photo.addEventListener('click', function() {
        openPopup(imagePopup);
        imageImagePopup.src = card.link;
        imageImagePopup.alt = card.name;
        captionImagePopup.textContent = card.name;
        });
};

enableValidation();

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url("${userInfo.avatar}")`;
    userId = userInfo._id;
    addCards(cards);
  })
  .catch((error) => {
        console.log(`Ошибка при получении данных: ${error.message}`);
  })
  