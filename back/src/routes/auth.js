const express = require('express')
const controller = require('../controller/auth.js')
const router = express.Router()

// crear ruta login
router.post('/login', controller.login)

// register
router.post('/register', controller.register)

// get user from params and response token
router.get('/user/:user', controller.getUser)


module.exports = router