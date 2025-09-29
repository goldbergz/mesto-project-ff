import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCardElement, handleDeleteCard } from './scripts/components/card.js';
import { openModal, closeModal, closeModalOverlay } from './scripts/components/modal.js';

const placesWrap = document.querySelector(".places__list");
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelector('.places__item');

const modalWindows = document.querySelectorAll('.popup');
const modalnewCardWindow = document.querySelector('.popup_type_new-card');
const modalEditProfiledWindow = document.querySelector('.popup_type_edit');
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

profileEditButton.addEventListener('click', () => openModal(modalEditProfiledWindow));
closeModalButton1.addEventListener('click', () => closeModal(modalEditProfiledWindow));

closeModalButton3.addEventListener('click', () => closeModal(modalImageWindow));



