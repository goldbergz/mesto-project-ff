import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCardElement, handleDeleteCard, handleLikeCard } from './scripts/components/card.js';
import { openModal, closeModal } from './scripts/components/modal.js';

const placesWrap = document.querySelector(".places__list");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const modalnewCardWindow = document.querySelector('.popup_type_new-card');
const modalEditProfiledWindow = document.querySelector('.popup_type_edit');
const modalImageWindow = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

const formEditProfileElement = document.forms['edit-profile'];
const nameEditProfileInput = formEditProfileElement.elements.name;
const jobEditProfileInput = formEditProfileElement.elements.description;

const formNewCardElement = document.forms['new-place'];
const nameNewCardInput = formNewCardElement.elements['place-name'];
const linkNewCardInput = formNewCardElement.elements.link;

const modalImage = modalImageWindow.querySelector(".popup__image");
const modalImageCaption = modalImageWindow.querySelector(".popup__caption");

addNewCardButton.addEventListener('click', () => openModal(modalnewCardWindow));
editProfileButton.addEventListener('click', () => {
  nameEditProfileInput.value = profileTitle.textContent;
  jobEditProfileInput.value = profileDescription.textContent;
  openModal(modalEditProfiledWindow);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup);
    }
  });
});

formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);
formEditProfileElement.addEventListener('submit', handleEditProfileFormSubmit);

function handleImageClick(name, link) {
  modalImage.name = name;
  modalImage.src = link;
  modalImageCaption.textContent = name;
  openModal(modalImageWindow);
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  
  profileTitle.textContent = nameEditProfileInput.value;
  profileDescription.textContent = jobEditProfileInput.value;

  closeModal(modalEditProfiledWindow);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();

  const newCard = {
    name: nameNewCardInput.value,
    link: linkNewCardInput.value
  }

  placesWrap.prepend(createCardElement(newCard, handleDeleteCard, handleLikeCard, handleImageClick));
  formNewCardElement.reset();
  closeModal(modalnewCardWindow);
}

initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard, handleLikeCard, handleImageClick));
});