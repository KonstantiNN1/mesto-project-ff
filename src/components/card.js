import {openPopup, closePopup} from './modal.js';

// функция добавления карточек из созданного массива
const elementsTemplate = document.querySelector('#card-template');
const elementsContainer = document.querySelector('.places__list');

export function addCard(cards) {
    cards.forEach(function(card) {
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
    
    cardImage.addEventListener('click', function() {
        openPopup(imagePopup);
        const imageImagePopup = imagePopup.querySelector('.popup__image');
        const captionImagePopup = imagePopup.querySelector('.popup__caption');
        imageImagePopup.src = this.src;
        imageImagePopup.alt = this.alt;
        captionImagePopup.textContent = this.alt;
    })

    const imagePopup = document.querySelector('.popup_type_image');
    const closingImagePopup = imagePopup.querySelector('.popup__close');

    closingImagePopup.addEventListener('click', function() {
        closePopup(imagePopup);
    });

    elementsContainer.append(newCard);

    });
};

// функция удаления карточки
export function deleteCard(card) {
    card.addEventListener('click', function() {
        const deletingCard = card.parentNode; 
        deletingCard.remove();
    })
}
 
// функция лайкания карточки
export function toggleLike(like) {
    like.addEventListener('click', function() {
        like.classList.toggle('card__like-button_is-active');
    });
};