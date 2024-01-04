import { cardLinkInput, cardNameInput, editSubmitButton, addSubmitButton, avatarSubmitButton} from '../index.js';

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

export const getUserInfo = async () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(res => checkResponse(res))
};
  
export const getCards = async () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при получении данных: ${error.message}`);
    });
};
    
export const pushInfo = async (newInfo) => {
    editSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newInfo.name,
            about: newInfo.about
        })
    })
    .then((res) => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        editSubmitButton.textContent = "Сохранить";
    });
};

export const pushAvatar = async (avatar) => {
    avatarSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then(res => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
    });
};
    
export const postCard = async () => {
    addSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardLinkInput.value
        })
    })
    .then(res => checkResponse(res))
    .catch(error => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
    .finally(() => {
        addSubmitButton.textContent = "Сохранить";
    });
};

export const deleteCardAPI = async (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
};

export const likeCardAPI = async (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method:  'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
};
    
export const deletelikeCardAPI = async (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((error) => {
        console.log(`Ошибка при сохранении данных: ${error.message}`);
    })
};