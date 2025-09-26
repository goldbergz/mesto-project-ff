import './pages/index.css'
import { initialCards } from './cards.js';

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// DOM узлы
const placesWrap = document.querySelector(".places__list");

// Функция создания карточки
function createCardElement(data, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  return cardElement;
}

// Функция удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Вывести карточки на страницу
initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});