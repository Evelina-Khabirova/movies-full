require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  SALT_ROUNDS,
} = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ServerError = require('../error/ServerError');
const NotFoundError = require('../error/NotFoundError');
const UnauthorizedError = require('../error/UnauthorizedError');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.registerUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, NODE_ENV === 'production' ? Number(SALT_ROUNDS) : 10)
    .then((password) => {
      User.create({
        name,
        email,
        password,
      })
        .then((user) => res.send(user.toJSON()))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            return next(new ValidationError('Неправильный ввод данных'));
          }
          return next(new ServerError('Ошибка на сервере'));
        });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      return bcrypt.compare(password, user.password, (error, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError('Неверный пароль'));
        }
        const token = jwt.sign({ _id: user._id }, (NODE_ENV === 'production') ? JWT_SECRET : 'secret', { expiresIn: '7d' });
        return res.send({ token }).end();
      });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.editUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Неправильный ввод данных'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};
