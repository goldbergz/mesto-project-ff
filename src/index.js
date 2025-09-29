import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCardElement, handleDeleteCard } from './scripts/components/card.js';
import { openModal, closeModal, closeModalOverlay, formEditProfileElement, nameInput, jobInput } from './scripts/components/modal.js';

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const placesWrap = document.querySelector(".places__list");
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

const modalWindows = document.querySelectorAll('.popup');
export const modalnewCardWindow = document.querySelector('.popup_type_new-card');
export const modalEditProfiledWindow = document.querySelector('.popup_type_edit');
export const modalImageWindow = document.querySelector('.popup_type_image');

const closeModalButtons = document.querySelectorAll('.popup__close');
const closeModalButton1 = closeModalButtons[0];
const closeModalButton2 = closeModalButtons[1];
const closeModalButton3 = closeModalButtons[2];


initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});

addNewCardButton.addEventListener('click', () => openModal(modalnewCardWindow));
closeModalButton2.addEventListener('click', () => closeModal(modalnewCardWindow));
document.addEventListener('click', (event) => closeModalOverlay(event, modalWindows));

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEditProfiledWindow)
});

closeModalButton1.addEventListener('click', () => closeModal(modalEditProfiledWindow));

closeModalButton3.addEventListener('click', () => closeModal(modalImageWindow));



