const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateLink = (value, helpers) => {
  if (!/https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validateId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateId),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
