const routerUser = require('express').Router();
const { validateUserId, validateEditUser } = require('../middlewares/validations');
const {
  getAllUsers, getUser, editUser, getUserId,
} = require('../controllers/user');

routerUser.get('/users', getAllUsers);
routerUser.get('/users/me', getUser);
routerUser.get('/users/:userId', validateUserId, getUserId);
routerUser.patch('/users', validateEditUser, editUser);

module.exports = routerUser;
