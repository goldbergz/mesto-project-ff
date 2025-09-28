function onEsc(event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    if (modal) modal.classList.remove('popup_is-opened');
  }
}

export function openModal(modal) {
  if (!modal) return;
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', onEsc);
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('popup_is-opened');
  document.addEventListener('keydown', onEsc);
}

export function closeModalOverlay(event, modal) {
  if (event.target === modal) {
    modal.classList.remove('popup_is-opened');
  }
}