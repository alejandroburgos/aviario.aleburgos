const express = require('express')

const auth = require('../controller/auth.js')
const revenue = require('../controller/revenue.js')
const withdrawal = require('../controller/withdrawal.js')
const pair = require('../controller/pair.js')

const router = express.Router()

// crear ruta login
router.post('/api/login', auth.login)

// register
router.post('/api/register', auth.register)

// recover password
router.post('/api/recover', auth.recover)

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

router.get('/api/revenueDay/:user/:date', revenue.getDailyReport)
router.get('/api/withdrawalDay/:user/:date', withdrawal.getDailyReport)

router.get('/api/revenueWeekly/:user/:startDate&&:endDate', revenue.getWeeklyReport)
router.get('/api/withdrawalWeekly/:user/:startDate&&:endDate', withdrawal.getWeeklyReport)

// delete revenue
router.delete('/api/revenue/:id', revenue.deleteRevenue)
router.delete('/api/withdrawal/:id', withdrawal.deleteWithdrawal)

// new pair of user
router.post('/api/newPair', pair.newPair)
// get pair of user
router.get('/api/pair/:user', pair.getPair)
// delete pair
router.delete('/api/pair/:id', pair.deletePair)

module.exports = router