import { profileTitle, profileDescription, modalEditProfiledWindow, placesWrap, modalnewCardWindow } from '../../index.js';
import { createCardElement, handleDeleteCard, handleLikeCard } from './card.js';

export const formEditProfileElement = document.forms['edit-profile'];
export const nameInput = formEditProfileElement.elements.name;
export const jobInput = formEditProfileElement.elements.description;

export const formNewCardElement = document.forms['new-place'];
export const nameNewCardInput = formNewCardElement.elements['place-name'];
export const linkNewCardInput = formNewCardElement.elements.link;

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

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(modalEditProfiledWindow);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  placesWrap.prepend(createCardElement([nameNewCardInput, linkNewCardInput], handleDeleteCard, handleLikeCard));
  closeModal(modalnewCardWindow);
}

formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);
formEditProfileElement.addEventListener('submit', handleEditProfileFormSubmit);