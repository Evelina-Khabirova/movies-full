const routerUser = require('express').Router();
const { validateEditUser } = require('../middlewares/validations');
const {
  getUser, editUser,
} = require('../controllers/user');

routerUser.get('/users/me', getUser);
routerUser.patch('/users/me', validateEditUser, editUser);

module.exports = routerUser;
