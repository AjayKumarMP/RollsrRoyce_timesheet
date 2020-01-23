const Router = require('express').Router();
const { login, logout, register } = require('./userController')

Router.post('/login', login)
Router.post('/logout', logout)
Router.post('/register', register)

module.exports = Router