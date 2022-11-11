const routerMovie = require('express').Router();
const { validateMovieId, validateCreateMovie } = require('../middlewares/validations');
const {
  getAllMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

routerMovie.get('/movies', getAllMovie);
routerMovie.post('/movies', validateCreateMovie, createMovie);
routerMovie.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = routerMovie;
