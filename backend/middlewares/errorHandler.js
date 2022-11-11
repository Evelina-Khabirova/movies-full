const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  if (isCelebrateError(err)) {
    res.status(statusCode).json(err);
  } else {
    res.status(statusCode).json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  }
  next();
};
