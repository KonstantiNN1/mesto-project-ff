import { handleImageClick, elementsTemplate, userId } from '../index.js';
import { deleteCardAPI, likeCardAPI, deletelikeCardAPI } from './api.js'

export function createCard(card, { handleLikeClick, handleDeleteClick, handleImagePopupClick }) {
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
            likeButton.classList.toggle('card__like-button_is-active');
        };
    };

    const deleteButton = newCard.querySelector('.card__delete-button');
    if (card.owner._id !== userId) {
        deleteButton.style.visibility = 'hidden';
    };

    handleImagePopupClick(cardImage, card);
    handleLikeClick(likeButton, card._id, likeNumber);
    handleDeleteClick(deleteButton, card._id);

    return newCard;
}

export function deleteCard(button, id) {
    button.addEventListener('click', function() {
        const deletingCard = button.closest('.card'); 
        deleteCardAPI(id) 
        .then(() => { 
            deletingCard.remove(); 
            handleDeleteClick(button, id);
        })
        .catch((error) => {
            console.log(`Ошибка при сохранении данных: ${error.message}`);
        });
    });
}

export function toggleLike(like, id, likeNumber) {
    like.addEventListener('click', function() {
        if (like.classList.contains('card__like-button_is-active')) {
            deletelikeCardAPI(id)
            .then((newLikesNumber) => {
                like.classList.toggle('card__like-button_is-active');
                likeNumber.textContent = newLikesNumber;
            })
            .catch((error) => {
                console.log(`Ошибка при сохранении данных: ${error.message}`);
            });
        } else {
            likeCardAPI(id)
            .then((newLikesNumber) => {
                like.classList.toggle('card__like-button_is-active');
                likeNumber.textContent = newLikesNumber;
            })
            .catch((error) => {
                console.log(`Ошибка при сохранении данных: ${error.message}`);
            });
        }
    });
}

// Обработчик лайка
export function handleLikeClick(likeButton, cardId, likeNumber) {
    toggleLike(likeButton, cardId, likeNumber);
}

// Обработчик удаления карточки
export function handleDeleteClick(deleteButton, cardId) {
    deleteCard(deleteButton, cardId);
}

// Обработчик клика по картинке
export function handleImagePopupClick(cardImage, card) {
    handleImageClick(cardImage, card);
}
