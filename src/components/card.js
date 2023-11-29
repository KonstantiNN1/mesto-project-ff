import { initialCards } from './cards.js';
import { openPopup, closePopup } from './modal.js';
import { elementsTemplate, elementsContainer, imagePopup, imageImagePopup, captionImagePopup } from '../index.js';

export function createCard(card, { toggleLike, deleteCard, handleImageClick }) {
    const newCard = elementsTemplate.content.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = card.name;

    const likeButton = newCard.querySelector('.card__like-button');
    toggleLike(likeButton);

    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteCard(deleteButton);

    handleImageClick(cardImage, card);

    return newCard;
};

export function addCards() {
    initialCards.forEach((item) => {
      elementsContainer.append(createCard(item, { toggleLike, deleteCard, handleImageClick }));
    });
};

// функция удаления карточки
export function deleteCard(card) {
    card.addEventListener('click', function() {
        const deletingCard = card.closest('.card'); 
        deletingCard.remove();
    });
};

// функция лайкания карточки
export function toggleLike(like) {
    like.addEventListener('click', function() {
        like.classList.toggle('card__like-button_is-active');
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