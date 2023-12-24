import {profileTitle, profileDescription, editingPopup, cardLinkInput, cardNameInput, addingPopup, addForm, elementsContainer, profileAvatar} from '../index.js';
import {closePopup} from './modal.js'
import {addCards, createCard, toggleLike, deleteCard, handleImageClick} from './card.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
    headers: {
      authorization: '63208fac-4a88-4355-afd5-d75a6f5f0710',
      'Content-Type': 'application/json'
    }
  };

function checkResponse(res) {
    if(res.ok) { 
        return res.json()
    } else {
        return Promise.reject(`Error: ${res.status}`)
    };
};

export function getInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(res => checkResponse(res))
    .then((result) => {
        profileTitle.textContent = result.name
        profileDescription.textContent = result.about
    }); 
};

export function getAvatar() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
})
    .then(res => checkResponse(res))
    .then((result) => {
        console.log(result)
        profileAvatar.style['background-image'] =  `url(${result.avatar})`
    }); 
}
    
export function pushInfo(newInfo) {
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newInfo.name,
            about: newInfo.about
        })
    })
    .then((res) => checkResponse(res))
    .then((newInfo) => {
        profileTitle.textContent = newInfo.name;
        profileDescription.textContent = newInfo.about;
        closePopup(editingPopup);
    })
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    });
    };

    export function pushAvatar(avatar) {
        return fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(res => checkResponse(res))
        .then((avatar) => {
            console.log(avatar);
            profileAvatar.style['background-image'] = `url(${avatar})`;            
        })
        .catch(error => console.error('Error:', error));
    };

    export function getCards() {
        return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        })
        .then(res => checkResponse(res))
        .then((result) => {
           addCards(result)
           console.log(result)
            })
        .catch((error) => {
            console.log(`Ошибка при получении данных: ${error.message}`);
        });
    }
    
    
export function postCard() {
        return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: cardNameInput.value,
                link: cardLinkInput.value
            })
        })
        .then(res => checkResponse(res)) 
        .then(() => {
            const newCard = {
                name: cardNameInput.value,
                link: cardLinkInput.value
              }
              const newCardElement = createCard(newCard, { toggleLike, deleteCard, handleImageClick });
              elementsContainer.prepend(newCardElement);
              closePopup(addingPopup);
              addForm.reset();
        })
    }

    export function deleteCardAPI(id) {
        return fetch(`${config.baseUrl}/cards/${id}`, {
            method:  'DELETE',
            headers: config.headers
        })
        .then(res => checkResponse(res))
    }
    
    export function likeCardAPI(id) {
        return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method:  'PUT',
            headers: {
                authorization: '63208fac-4a88-4355-afd5-d75a6f5f0710'
            }
        })
        .then(res => checkResponse(res))
        .then ((result) => {
            console.log(result)
        })
    }
    
    export function deletelikeCardAPI(id) {
        return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method:  'DELETE',
            headers: config.headers
        })
        .then(res => checkResponse(res))
        .then ((result) => {
            console.log(result)
        })
    }

    const avatar = document.querySelector('.profile__image')