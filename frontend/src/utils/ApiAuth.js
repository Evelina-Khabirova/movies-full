export default class ApiAuth {
  constructor(options) {
    this._options = options;
    this._headers = {
      "Content-Type": "application/json"
    }
  }

  _handleErrors(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Возникла ошибка')
  }

  registerUser({name, email, password}) {
    return fetch(`${this._options}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }

  loginUser({email, password}) {
    return fetch(`${this._options}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    })
    .then((data) => {
      localStorage.setItem('token', data.token)
    });
  }

  getToken() {
    return fetch(`${this._options}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }
}