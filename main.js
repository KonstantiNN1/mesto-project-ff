(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{t_:()=>C,mD:()=>h,I1:()=>E,yU:()=>x,vV:()=>b});function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("mousedown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),document.removeEventListener("mousedown",o)}function o(e){e.target.classList.contains("popup_is-opened")&&n(e.target)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function c(e,t){var n=t.toggleLike,o=t.deleteCard,r=t.handleImageClick,c=E.content.cloneNode(!0),d=c.querySelector(".card__image");return d.src=e.link,d.alt=e.name,c.querySelector(".card__title").textContent=e.name,n(c.querySelector(".card__like-button")),o(c.querySelector(".card__delete-button")),r(d,e),c}function d(e){e.addEventListener("click",(function(){e.closest(".card").remove()}))}function i(e){e.addEventListener("click",(function(){e.classList.toggle("card__like-button_is-active")}))}function a(e,n){e.addEventListener("click",(function(){t(b),x.src=n.link,x.alt=n.name,C.textContent=n.name}))}var l=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_new-card"),u=document.querySelector(".profile__add-button"),m=l.querySelector(".popup__close"),_=p.querySelector(".popup__close"),v=document.forms["edit-profile"],y=v.elements.name,f=v.elements.description,k=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),L=document.forms["new-place"],q=L.elements.place,S=L.elements.link,E=document.querySelector("#card-template"),h=document.querySelector(".places__list"),b=document.querySelector(".popup_type_image"),x=b.querySelector(".popup__image"),C=b.querySelector(".popup__caption"),j=b.querySelector(".popup__close");v.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=y.value,g.textContent=f.value,n(l)})),s.addEventListener("click",(function(){t(l),y.value=k.textContent,f.value=g.textContent})),m.addEventListener("click",(function(){n(l)})),u.addEventListener("click",(function(){t(p)})),_.addEventListener("click",(function(){n(p)})),j.addEventListener("click",(function(){n(b)})),L.addEventListener("submit",(function(e){e.preventDefault();var t=c({name:q.value,link:S.value},{toggleLike:i,deleteCard:d,handleImageClick:a});h.prepend(t),n(p),L.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){h.append(c(e,{toggleLike:i,deleteCard:d,handleImageClick:a}))}))})();