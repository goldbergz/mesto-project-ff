const environments = {
  token: '5e1bd1c0-cdc8-4f75-be21-deab4e401af8',
  group_id: 'higher-front-back-dev'
}

const serverUrl = 'https://nomoreparties.co/v1/';

const baseRequest = {
  baseUrl: `${serverUrl}${environments.group_id}`,
  headers: {
    authorization: `${environments.token}`,
    'Content-Type': 'application/json'
  }
}

const createBaseRequest = (endpoint, options = {}) => {
  return fetch(`${baseRequest.baseUrl}${endpoint}`, {
    headers: baseRequest.headers,
    ...options
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => { throw new Error('Ошибка запроса к серверу', err) })
}

export const getProfileInformation = () => createBaseRequest('/users/me')

export const getCards = () => createBaseRequest('/cards')

export const createNewCard = (cardBody) =>
  createBaseRequest('/cards', {
    method: 'POST',
    body: JSON.stringify(cardBody)
  })

export const deleteCard = (cardId) =>
  createBaseRequest(`/cards/${cardId}`, {
    method: 'DELETE'
  })

export const updateProfileInformation = (profileBody) =>
  createBaseRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(profileBody)
  })

export const updateProfileAvatar = (profileBody) =>
  createBaseRequest('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify(profileBody)
  })

export const likeCard = (cardId) =>
  createBaseRequest(`/cards/likes/${cardId}`, {
    method: 'PUT'
  })

export const unlikeCard = (cardId) =>
  createBaseRequest(`/cards/likes/${cardId}`, {
    method: 'DELETE'
  })
