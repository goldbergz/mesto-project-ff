import { profileTitle, profileDescription, modalEditProfiledWindow, placesWrap, modalnewCardWindow, nameEditProfileInput, jobEditProfileInput, nameNewCardInput, linkNewCardInput } from '../../index.js';
import { createCardElement, handleDeleteCard, handleLikeCard } from './card.js';

function onEsc(event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    if (modal) modal.classList.remove('popup_is-opened');
  }
}

export function openModal(modal) {
  if (!modal) return;
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', onEsc);
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('popup_is-opened');

}

export function closeModalOverlay(event, modals) {
  for (const modal of modals) {
    if (event.target === modal) {
      modal.classList.remove('popup_is-opened');
    }
  }
}

export function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  
  profileTitle.textContent = nameEditProfileInput.value;
  profileDescription.textContent = jobEditProfileInput.value;

  closeModal(modalEditProfiledWindow);
}

export function handleNewCardFormSubmit(event) {
  event.preventDefault();
  placesWrap.prepend(createCardElement([nameNewCardInput, linkNewCardInput], handleDeleteCard, handleLikeCard));
  closeModal(modalnewCardWindow);
}
