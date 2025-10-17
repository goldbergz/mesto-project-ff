import './pages/index.css'
import { createCardElement, handleDeleteCard, handleLikeCard } from './scripts/components/card.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { enableValidation, clearValidation } from './scripts/components/validation.js';
import { getProfileInformation, getCards, createNewCard, deleteCard, updateProfileInformation } from './scripts/components/api.js';

const placesWrap = document.querySelector(".places__list");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const modalnewCardWindow = document.querySelector('.popup_type_new-card');
const modalEditProfiledWindow = document.querySelector('.popup_type_edit');
const modalImageWindow = document.querySelector('.popup_type_image');
const modalEditAvatarWindow = document.querySelector('.popup_type_edit-avatar');
const modalDeleteImageWindow = document.querySelector('.popup_type_delete-image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

const formEditProfileElement = document.forms['edit-profile'];
const nameEditProfileInput = formEditProfileElement.elements.name;
const jobEditProfileInput = formEditProfileElement.elements.description;

const formNewCardElement = document.forms['new-place'];
const nameNewCardInput = formNewCardElement.elements['place-name'];
const linkNewCardInput = formNewCardElement.elements.link;

const popupDeleteButton = modalDeleteImageWindow.querySelector('.popup__button');

const modalImage = modalImageWindow.querySelector(".popup__image");
const modalImageCaption = modalImageWindow.querySelector(".popup__caption");

let currentUserId;
let cardToDelete = null;
let cardIdToDelete = null;

profileImage.addEventListener('click', () => openModal(modalEditAvatarWindow))

addNewCardButton.addEventListener('click', () => {
  formNewCardElement.reset();
  clearValidation(formNewCardElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openModal(modalnewCardWindow);
});

editProfileButton.addEventListener('click', () => {
  nameEditProfileInput.value = profileTitle.textContent;
  jobEditProfileInput.value = profileDescription.textContent;
  clearValidation(formEditProfileElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
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
popupDeleteButton.addEventListener('click', confirmDeleteCard);


function handleImageClick(name, link) {
  modalImage.name = name;
  modalImage.src = link;
  modalImageCaption.textContent = name;
  openModal(modalImageWindow);
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  updateProfileInformation({
    name: nameEditProfileInput.value,
    about: jobEditProfileInput.value
  })
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
  
  closeModal(modalEditProfiledWindow);
}

function handleDelete(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(modalDeleteImageWindow)
}

function confirmDeleteCard() {
  if (!cardToDelete) return;
  deleteCard(cardIdToDelete)
    .then(() => {
      handleDeleteCard(cardToDelete);
      closeModal(modalDeleteImageWindow);
    })
    .catch((err) => console.error('Ошибка удаления карточки:', err))
    .finally(() => {
      cardToDelete = null;
      cardIdToDelete = null;
    })
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();

  const newCard = {
    name: nameNewCardInput.value,
    link: linkNewCardInput.value
  }

  createNewCard(newCard)
    .then((createdCard) => {
      placesWrap.prepend(
        createCardElement(createdCard, {
          onDelete: handleDelete,
          onLike: handleLikeCard,
          onImageClick: handleImageClick,
          userId: currentUserId
        }));
    formNewCardElement.reset();
    closeModal(modalnewCardWindow);
    })
.catch((err) => console.error('Ошибка при создании карточки:', err));
}

Promise.all([getProfileInformation(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    currentUserId = userData._id; 

    cards.forEach((data) => {
      placesWrap.append(
        createCardElement(data, {
          onDelete: handleDelete,
          onLike: handleLikeCard,
          onImageClick: handleImageClick,
          userId: currentUserId,
          likeCount: data.likes
        }));
    })
  })
  .catch((err) => console.error('Ошибка заполнения данных:', err));


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
