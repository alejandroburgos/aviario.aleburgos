const express = require('express')

const auth = require('../controller/auth.js')
const revenue = require('../controller/revenue.js')
const withdrawal = require('../controller/withdrawal.js')

const router = express.Router()

// crear ruta login
router.post('/api/login', auth.login)

// register
router.post('/api/register', auth.register)

// get user from params and response token
router.get('/api/user/:user', auth.getUser)

// post revenue of money 
router.post('/api/revenue', revenue.revenue)
router.post('/api/withdrawal', withdrawal.withdrawal)

//  getAll revenue of user
router.get('/api/revenue/:user', revenue.getAllRevenue)
router.get('/api/withdrawal/:user', withdrawal.getAllWithdrawal)

// getMonthlyReport
router.get('/api/revenueMonthly/:user', revenue.getMonthlyReport)
router.get('/api/withdrawalMonthly/:user', withdrawal.getMonthlyReport)

module.exports = router