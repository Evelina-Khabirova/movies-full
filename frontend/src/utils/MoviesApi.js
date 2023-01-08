export default class MoviesApi {
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

  getMovies() {
    return fetch(`${this._options}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  }
}