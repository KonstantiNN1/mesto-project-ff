// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// import initialCards from cards.js 

const editingPopup = document.querySelector('.popup_type_edit');
const editingButton = document.querySelector('.profile__edit-button');
const addingPopup = document.querySelector('.popup_type_new-card');
const addingButton = document.querySelector('.profile__add-button');
const closingEditButton = editingPopup.querySelector('.popup__close');
const closingAddButton = addingPopup.querySelector('.popup__close');

const elementsTemplate = document.querySelector('#card-template');
const elementsContainer = document.querySelector('.places__list');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
};

editingButton.addEventListener('click', function() {
    openPopup(editingPopup)});

closingEditButton.addEventListener('click', function() {
    closePopup(editingPopup)});

addingButton.addEventListener('click', function() {
    openPopup(addingPopup);
});

closingAddButton.addEventListener('click', function() {
    closePopup(addingPopup)});

// функция добавления карточек из созданного массива с встроенными штуками
function addCard(cards) {
    cards.forEach(function(card) {
    const newCard = elementsTemplate.content.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = card.name;

    const likeButton = newCard.querySelector('.card__like-button');
    toggleLike(likeButton)

    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteCard(deleteButton) 
    
    cardImage.addEventListener('click', function() {
        openPopup(imagePopup)
        const imageImagePopup = imagePopup.querySelector('.popup__image');
        const captionImagePopup = imagePopup.querySelector('.popup__caption');
        imageImagePopup.src = this.src;
        imageImagePopup.alt = this.alt;
        captionImagePopup.textContent = this.alt;
    })

    const imagePopup = document.querySelector('.popup_type_image');
    const closingImagePopup = imagePopup.querySelector('.popup__close');

    closingImagePopup.addEventListener('click', function() {
        closePopup(imagePopup)
    });

    elementsContainer.append(newCard);

    })
}

// функция удаления карточки
function deleteCard(card) {
    card.addEventListener('click', function() {
        const deletingCard = card.parentNode; 
        deletingCard.remove();
    })
}
    
// функция лайкания карточки
function toggleLike(like) {
    like.addEventListener('click', function() {
        like.classList.toggle('card__like-button_is-active');
    });
};
    
addCard(initialCards);