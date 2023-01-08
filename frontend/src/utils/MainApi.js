export default class MainApi {
  constructor(options, token) {
    this._options = options;
    this._headers = {
      "Content-Type": "application/json",
      authorization: token,
    };
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
      headers: {
        "Content-Type": "application/json"
      },
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
      headers: {
        "Content-Type": "application/json"
      },
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

  getUser() {
    return fetch(`${this._options}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  };

  editUser(nameUser, emailUser) {
    return fetch(`${this._options}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: nameUser,
        email: emailUser,
      }),
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  };

  getSavedMovies() {
    return fetch(`${this._options}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  };

  createMovie(movie) {
    return fetch(`${this._options}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ ...movie }),
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  };

  deleteMovie(movieId) {
    return fetch(`${this._options}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  };
}