// функции открытия и закрытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('mousedown', closeByOverlay);
};

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('mousedown', closeByOverlay);
};

// закрытие попапа на оверлэй
export function closeByOverlay(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(evt.target);
    };
};

// закрытие на escape
export function closeByEscape(evt) { 
    if (evt.key === 'Escape') {
        const popup = document.querySelector(`.popup_is-opened`);
        closePopup(popup);
    };
};