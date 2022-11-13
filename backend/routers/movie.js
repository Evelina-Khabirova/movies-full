const routerMovie = require('express').Router();
const { validateMovieId, validateCreateMovie } = require('../middlewares/validations');
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

routerMovie.get('/movies', getMovie);
routerMovie.post('/movies', validateCreateMovie, createMovie);
routerMovie.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = routerMovie;
