const express = require('express')

const auth = require('../controller/auth.js')
const revenue = require('../controller/revenue.js')
const withdrawal = require('../controller/withdrawal.js')

const router = express.Router()

// crear ruta login
router.post('/login', auth.login)

// register
router.post('/register', auth.register)

// get user from params and response token
router.get('/user/:user', auth.getUser)

// post revenue of money 
router.post('/revenue', revenue.revenue)
router.post('/withdrawal', withdrawal.withdrawal)

//  getAll revenue of user
router.get('/revenue/:user', revenue.getAllRevenue)
router.get('/withdrawal/:user', withdrawal.getAllWithdrawal)

// getMonthlyReport
router.get('/revenueMonthly/:user', revenue.getMonthlyReport)
router.get('/withdrawalMonthly/:user', withdrawal.getMonthlyReport)

module.exports = router