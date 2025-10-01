import { cardTemplate } from '../../index.js';

export function createCardElement(data, onDelete, onLike) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const cardImage = cardElement.querySelector(".card__image");
  if (!data.link && !data.name) {
    cardImage.src = data[1].value;
    cardImage.alt = data[0].value;
    cardElement.querySelector(".card__title").textContent = data[0].value;
  } else {
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;
  }

  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener('click', onLike);

  return cardElement;
}

export function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

export function handleLikeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

