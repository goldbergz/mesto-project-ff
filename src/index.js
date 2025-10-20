import './pages/index.css'
import { createCardElement, handleDeleteCard, handleLikeCard } from './scripts/components/card.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { enableValidation, clearValidation } from './scripts/components/validation.js';
import { getProfileInformation, getCards, createNewCard, deleteCard, updateProfileInformation, likeCard, unlikeCard, updateProfileAvatar } from './scripts/components/api.js';

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
const buttonEditProfileElement = formEditProfileElement.querySelector('.popup__button');

const formNewCardElement = document.forms['new-place'];
const nameNewCardInput = formNewCardElement.elements['place-name'];
const linkNewCardInput = formNewCardElement.elements.link;
const buttonNewCardElement = formNewCardElement.querySelector('.popup__button');

const formEditProfileAvatarElement = document.forms['edit-avatar'];
const linkEditProfileAvatarInput = formEditProfileAvatarElement.elements.link;
const buttonEditProfileAvatarElement = formEditProfileAvatarElement.querySelector('.popup__button');

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

formNewCardElement.addEventListener('submit', (event) => {
  handleNewCardFormSubmit(event, buttonNewCardElement)
});
formEditProfileElement.addEventListener('submit', (event) => {
  handleEditProfileFormSubmit(event, buttonEditProfileElement)
});
formEditProfileAvatarElement.addEventListener('submit', (event) => {
  handleEditProfileAvatarFormSubmit(event, buttonEditProfileAvatarElement)
})
popupDeleteButton.addEventListener('click', confirmDeleteCard);

function handleImageClick(name, link) {
  modalImage.name = name;
  modalImage.src = link;
  modalImageCaption.textContent = name;
  openModal(modalImageWindow);
}

function handleEditProfileAvatarFormSubmit(event, submitButton) {
  event.preventDefault();
  renderLoading(true, submitButton)
  updateProfileAvatar({
    avatar: linkEditProfileAvatarInput.value
  })
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.error('Ошибка обновления аватара:', err))
    .finally(() => renderLoading(false, submitButton))
  
  formEditProfileAvatarElement.reset();
  closeModal(modalEditAvatarWindow);
}

function handleEditProfileFormSubmit(event, submitButton) {
  event.preventDefault();
  renderLoading(true, submitButton)
  updateProfileInformation({
    name: nameEditProfileInput.value,
    about: jobEditProfileInput.value
  })
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((err) => { console.error('Ошибка обновления данных пользователя:', err) })
    .finally(() => renderLoading(false, submitButton))
  
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

function handleLike(cardId, likeButton, likeCounter) {

  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  likeAction
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active', !isLiked);
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error('Ошибка при обновлении лайка:', err));
}

function handleNewCardFormSubmit(event, submitButton) {
  event.preventDefault();
  renderLoading(true, submitButton);
  const newCard = {
    name: nameNewCardInput.value,
    link: linkNewCardInput.value
  }

  createNewCard(newCard)
    .then((createdCard) => {
      placesWrap.prepend(
        createCardElement(createdCard, {
          onDelete: handleDelete,
          onLike: handleLike,
          onImageClick: handleImageClick,
          userId: currentUserId
        }));
    })
    .catch((err) => console.error('Ошибка при создании карточки:', err))
    .finally(() => renderLoading(false, submitButton))
  
  formNewCardElement.reset();
  closeModal(modalnewCardWindow);
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
          onLike: handleLike,
          onImageClick: handleImageClick,
          userId: currentUserId
        }));
    })
  })
  .catch((err) => console.error('Ошибка заполнения данных:', err));

function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
