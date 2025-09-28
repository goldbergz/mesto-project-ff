const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");


export function createCardElement(data, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  return cardElement;
}

export function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}
