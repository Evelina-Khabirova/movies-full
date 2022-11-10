require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  MONGO_URL,
} = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routerUser = require('./routers/user');
//const routerMovie = require('./routers/movie');
const { loginUser, registerUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validations');
const errorHandler = require('./middlewares/errorHandler');
const { handleCors } = require('./middlewares/handleCors');
const NotFoundError = require('./error/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(handleCors);
app.use(requestLogger);
app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateCreateUser, registerUser);
app.use(auth);
app.use('/', routerUser);
//app.use('/', routerMovie);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Сервер не найден'));
  next();
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

function connect() {
  mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviedb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(NODE_ENV === 'production' ? PORT : 3000);
}

connect();
