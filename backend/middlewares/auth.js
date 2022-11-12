require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const jwt = require('jsonwebtoken');
const ServerError = require('../error/ServerError');
const UnauthorizedError = require('../error/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) {
      return next(new UnauthorizedError('Отсутствует токен'));
    }
    const payload = jwt.verify(token, (NODE_ENV === 'production') ? JWT_SECRET : 'secret');
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === 'TypeError') {
      return next(new UnauthorizedError('Пользователь не авторизирован'));
    }
    return next(new ServerError('Ошибка сервера'));
  }
};
