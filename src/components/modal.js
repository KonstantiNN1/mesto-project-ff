import {closeByEscape, closeByOverlay} from '../index.js'

// функция открытия и закрытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlay) 
};

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlay) 
};

