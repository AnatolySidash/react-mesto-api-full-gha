class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  editProfile({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "about": job
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }


  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
      .then(this._checkResponse);
  }

  changeAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  checkLikeQuantity(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "GET",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        "id": id,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto.sidash.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default api;
