function closeByEsc(event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    if (modal) closeModal(modal);
  }
}

export function openModal(modal) {
  if (!modal) return;
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}
