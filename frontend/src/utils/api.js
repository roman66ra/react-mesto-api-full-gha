class Api {
  constructor(options) {
    this._url = options.url;
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
      .then(res => this._checkServer(res))
  }

  getUserInfo(token) {
    return fetch (`${this._url}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
      .then(res => this._checkServer(res))
  }

  patchUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
        .then(res => this._checkServer(res))
  }

  patchUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({ 
        avatar: data.avatar 
      })
    })
      .then(res => this._checkServer(res))
  }

  postNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
        })
    })
        .then(res => this._checkServer(res))
  }

  deleteCard(data, token) {
    return fetch(`${this._url}/cards/${data}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
    })
      .then(res => this._checkServer(res));
  }

  putLikeCard(data, token) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
  })
    .then(res => this._checkServer(res));
  }

  deleteLikeCard(data, token){
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
  })
    .then(res => this._checkServer(res));
  }
  
  _checkServer(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
}

const api = new Api({url: 'http://api.romanramesto.nomoredomainsicu.ru'})

export default api