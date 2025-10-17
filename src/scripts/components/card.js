const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

export function createCardElement(data, { onDelete, onLike, onImageClick, userId, likeCount }) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeSection = cardElement.querySelector('.card__like-block');
  const likeCounter = likeSection.querySelector('.card__like-counter');
  const likeButton = likeSection.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes?.length || 0;;

  if (userId === data.owner._id) {
    deleteButton.addEventListener("click", () => onDelete(cardElement, data._id));
  } else {
    deleteButton.remove();
  }


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

