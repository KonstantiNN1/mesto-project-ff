import { deleteCardAPI, likeCardAPI, deletelikeCardAPI } from './api.js'

export function createCard(card, { handleLikeClick, handleDeleteClick, handleImageClick }, userId) {
    const elementsTemplate = document.querySelector('#card-template');
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

    deleteButton.addEventListener('click', () => handleDeleteClick(deleteButton, card._id))
    likeButton.addEventListener('click', () =>  handleLikeClick(likeButton, card._id, likeNumber))

    handleImageClick(cardImage, card)

    return newCard;
};

export function handleDeleteClick(button, id) {
    const deletingCard = button.closest('.card'); 
    deleteCardAPI(id) 
    .then(() => { 
        deletingCard.remove(); 
    })
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    });
};

export function handleLikeClick(like, id, likeNumber) {
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
    };
};