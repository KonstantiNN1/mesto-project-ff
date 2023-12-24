import { openPopup, closePopup } from './modal.js';
import { elementsTemplate, elementsContainer, imagePopup, imageImagePopup, captionImagePopup} from '../index.js';
import { deleteCardAPI, likeCardAPI, deletelikeCardAPI} from './api.js'

export function createCard(card, { toggleLike, deleteCard, handleImageClick }) {
    const newCard = elementsTemplate.content.cloneNode(true);
    
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = card.name;

    const likeNumber = newCard.querySelector('.card__quantity-likes')
    likeNumber.textContent = card.likes.length
    console.log(likeNumber.textContent)

    const likeButton = newCard.querySelector('.card__like-button');
    for (let i = 0; i < card.likes.length; i++) {
        if (card.likes[i]._id === 'e14caaa8dae8b43968f19c9f') {
            likeButton.classList.toggle('card__like-button_is-active')
        }
    }

    toggleLike(likeButton, card._id);

    const deleteButton = newCard.querySelector('.card__delete-button');
    if (card.owner._id !== 'e14caaa8dae8b43968f19c9f') {
        deleteButton.style.visibility = 'hidden'
    }

    deleteCard(deleteButton, card._id);  

    handleImageClick(cardImage, card);

    return newCard
};

export function addCards(arr) {
    arr.forEach((item) => {
      elementsContainer.append(createCard(item,  { toggleLike, deleteCard, handleImageClick }));
    });
};

// функция удаления карточки
export function deleteCard(button, id) {
    button.addEventListener('click', function() {
        const deletingCard = button.closest('.card')
        deleteCardAPI(id)
        console.log(id)
        deletingCard.remove();

    });
};

// функция лайкания карточки
export function toggleLike(like, id) {
    like.addEventListener('click', function() {
        if (like.classList.contains('card__like-button_is-active')) {
            like.classList.toggle('card__like-button_is-active')
            deletelikeCardAPI(id)
        } else {
            like.classList.toggle('card__like-button_is-active');
         likeCardAPI(id)      
        console.log(id)
        }

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
