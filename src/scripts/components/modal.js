import { profileTitle, profileDescription, modalEditProfiledWindow } from '../../index.js';

export const formEditProfileElement = document.forms['edit-profile'];
export const nameInput = formEditProfileElement.elements.name;
export const jobInput = formEditProfileElement.elements.description;

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

function handleFormSubmit(event) {
  event.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(modalEditProfiledWindow);
}

formEditProfileElement.addEventListener('submit', handleFormSubmit);