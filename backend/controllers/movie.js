const Movie = require('../models/movie');
const ServerError = require('../error/ServerError');
const NotFoundError = require('../error/NotFoundError');
const ValidationError = require('../error/ValidationError');
const ForbiddenError = require('../error/ForbiddenError');

module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id})
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError('Фильма с таким id не существует')))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалять чужие фильмы'));
      }
      return movie.remove()
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Получен неверный id'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};
