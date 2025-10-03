const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

export function createCardElement(data, onDelete, onLike, onImageClick) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () => onDelete(cardElement) );
  likeButton.addEventListener('click', () => onLike(likeButton));
  cardImage.addEventListener('click', () => onImageClick(data.name, data.link))

  return cardElement;
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
}

export function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

