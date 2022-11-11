const routerUser = require('express').Router();
const { validateUserId, validateEditUser } = require('../middlewares/validations');
const {
  getUser, editUser, getUserId,
} = require('../controllers/user');

routerUser.get('/users', getUser);
routerUser.get('/users/:userId', validateUserId, getUserId);
routerUser.patch('/users', validateEditUser, editUser);

module.exports = routerUser;
