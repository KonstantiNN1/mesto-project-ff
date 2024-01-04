import { openPopup } from './modal.js';
import { elementsTemplate, elementsContainer, imagePopup, imageImagePopup, captionImagePopup, userId } from '../index.js';
import { deleteCardAPI, likeCardAPI, deletelikeCardAPI } from './api.js'

export function createCard(card, { toggleLike, deleteCard, handleImageClick }) {
    const newCard = elementsTemplate.content.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = card.name;

    const likeNumber = newCard.querySelector('.card__number-of-likes');
    likeNumber.textContent = card.likes.length;

    const likeButton = newCard.querySelector('.card__like-button');
    for (let i = 0; i < card.likes.length; i++) {
        if (card.likes[i]._id === userId) {
            likeButton.classList.toggle('card__like-button_is-active')
        };
    };

    toggleLike(likeButton, card._id, likeNumber, card);

    const deleteButton = newCard.querySelector('.card__delete-button');
    if (card.owner._id !== userId) {
        deleteButton.style.visibility = 'hidden'
    };

    deleteCard(deleteButton, card._id);  
    handleImageClick(cardImage, card);

    return newCard
};

export function addCards(arr) {
    arr.forEach((item) => {
      elementsContainer.append(createCard(item, { toggleLike, deleteCard, handleImageClick }));
    });
};

// функция удаления карточки
export function deleteCard(button, id)
    // .then(res => checkResponse(res))
    {
    button.addEventListener('click', function() {
        const deletingCard = button.closest('.card');
        deleteCardAPI(id)
        .then(() => {
        deletingCard.remove()
        });
    });
};

// функция лайкания карточки
export function toggleLike(like, id, likeNumber, card) {
    like.addEventListener('click', function() {
        if (like.classList.contains('card__like-button_is-active')) {
            deletelikeCardAPI(id)
            .then(() => {
                like.classList.toggle('card__like-button_is-active');
            })
            .then(() => {
                likeNumber.textContent = card.likes.length;
            })
        } else {
            likeCardAPI(id)
            .then(() => {
            like.classList.toggle('card__like-button_is-active');
            })
            .then(() => {
                likeNumber.textContent = card.likes.length;
            })
        };
    });
};

export function handleImageClick(photo, card) {
    photo.addEventListener('click', function() {
        openPopup(imagePopup);
        imageImagePopup.src = card.link;
        imageImagePopup.alt = card.name;
        captionImagePopup.textContent = card.name;
        });
};