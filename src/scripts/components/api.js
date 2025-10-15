const environments = {
  token: '5e1bd1c0-cdc8-4f75-be21-deab4e401af8',
  group_id: 'higher-front-back-dev'
}

const baseRequest = {
  baseUrl: `https://nomoreparties.co/v1/${environments.group_id}`,
  headers: {
    authorization: `${environments.token}`,
    'Content-Type': 'application/json'
  }
}

export const getProfileInformation = () => {
  return fetch(`${baseRequest.baseUrl}/users/me`, {
    method: 'GET',
    headers: baseRequest.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => { throw new Error('Ошибка загрузки профиля', err) })
}

export const getCards = () => {
  return fetch(`${baseRequest.baseUrl}/cards`, {
    method: 'GET',
    headers: baseRequest.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => { throw new Error('Ошибка загрузки карточек', err) })
}