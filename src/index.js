import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCardElement, handleDeleteCard, handleLikeCard } from './scripts/components/card.js';
import { openModal, closeModal, closeModalOverlay, handleEditProfileFormSubmit, handleNewCardFormSubmit } from './scripts/components/modal.js';

export const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
export const placesWrap = document.querySelector(".places__list");

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const modalWindows = document.querySelectorAll('.popup');
export const modalnewCardWindow = document.querySelector('.popup_type_new-card');
export const modalEditProfiledWindow = document.querySelector('.popup_type_edit');
export const modalImageWindow = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

const closeEditProfileModalButton = modalEditProfiledWindow.querySelector('.popup__close');
const closeNewCardModalButton = modalnewCardWindow.querySelector('.popup__close');
const closeImageModalButton = modalImageWindow.querySelector('.popup__close');

const formEditProfileElement = document.forms['edit-profile'];
export const nameEditProfileInput = formEditProfileElement.elements.name;
export const jobEditProfileInput = formEditProfileElement.elements.description;

const formNewCardElement = document.forms['new-place'];
export const nameNewCardInput = formNewCardElement.elements['place-name'];
export const linkNewCardInput = formNewCardElement.elements.link;

addNewCardButton.addEventListener('click', () => openModal(modalnewCardWindow));
closeNewCardModalButton.addEventListener('click', () => closeModal(modalnewCardWindow));
document.addEventListener('click', (event) => closeModalOverlay(event, modalWindows));

editProfileButton.addEventListener('click', () => {
  nameEditProfileInput.value = profileTitle.textContent;
  jobEditProfileInput.value = profileDescription.textContent;
  openModal(modalEditProfiledWindow);
});

closeEditProfileModalButton.addEventListener('click', () => closeModal(modalEditProfiledWindow));
closeImageModalButton.addEventListener('click', () => closeModal(modalImageWindow));

formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);
formEditProfileElement.addEventListener('submit', handleEditProfileFormSubmit);

initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard, handleLikeCard));
});