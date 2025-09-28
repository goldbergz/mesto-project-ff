import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCardElement, handleDeleteCard } from './scripts/components/card.js';
import { openModal, closeModal, closeModalOverlay } from './scripts/components/modal.js';

const placesWrap = document.querySelector(".places__list");
const addNewCardButton = document.querySelector('.profile__add-button');
const modalWindow = document.querySelector('.popup_type_new-card');
const closeModalButtons = document.querySelectorAll('.popup__close');
const closeModalButton2 = closeModalButtons[1];

initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});

addNewCardButton.addEventListener('click', () => openModal(modalWindow));
closeModalButton2.addEventListener('click', () => closeModal(modalWindow));
document.addEventListener('click', (event) => closeModalOverlay(event, modalWindow));

