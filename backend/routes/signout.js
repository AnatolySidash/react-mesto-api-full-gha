const signoutRouter = require('express').Router();
const { clearCookies } = require('../controllers/users');

signoutRouter.get('/signout', clearCookies);
