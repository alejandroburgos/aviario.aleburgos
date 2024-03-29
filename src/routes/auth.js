const express = require('express')

const auth = require('../controller/auth.js')
const revenue = require('../controller/revenue.js')
const withdrawal = require('../controller/withdrawal.js')
const pair = require('../controller/pair.js')
const calendar = require('../controller/calendar.js')
const category = require('../controller/category.js')
const pgaVictories = require('../controller/pgaVictories.js')
const holiday = require('../controller/holiday.js')
const properties = require('../controller/properties.js')
const router = express.Router()

// ********************************************* GOLF **********************************************
// create player 
// router.post('/api-golf/createPlayer', pgaVictories.createPlayer)

router.post('/api-golf/addVictory', pgaVictories.addVictories)

// get all victories
router.get('/api-golf/getVictories', pgaVictories.getVictories)

// delete victory
router.delete('/api-golf/deleteVictory/:id', pgaVictories.deleteVictory)

// get all victories by player of starDate and endDate
router.get('/api-golf/getVictoriesByWeek/:startDate&&:endDate', pgaVictories.getVictoriesByWeek)

// get monthly report
router.get('/api-golf/getMonthlyReport/:date', pgaVictories.getMonthlyReport)

// get victories by player and start and end date
router.get('/api-golf/getVictoriesByPlayer/:player/:startDate&&:endDate', pgaVictories.getVictoriesByPlayer)


// ********************************************* GOLF **********************************************

// crear ruta login
router.post('/api/login', auth.login)

// register
router.post('/api/register', auth.register)

// recover password
router.post('/api/recover', auth.recover)

// get user from params and response token
router.get('/api/user/:user', auth.getUser)

// post request to update read_update
router.post('/api/readUpdate', auth.update)

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
// edit pair
router.put('/api/editPair/:id', pair.editPair)
// delete pair
router.delete('/api/pair/:id/:user', pair.deletePair)
// get pair from id
router.get('/api/pairById/:id', pair.getPairById)
// get iniIncubacion and finIncubacion
router.get('/api/birth/:user', pair.getArrPuestasParejas)

// new calendar
router.post('/api/newCalendar', calendar.newCalendar)
// get all calendars from the user
router.get('/api/getCalendar/:user', calendar.getCalendar)
// edit calendar
router.put('/api/editCalendar/:id', calendar.editCalendar)
// delete calendar
router.delete('/api/deleteCalendar/:id/:user', calendar.deleteCalendar)


// create new calendar category
router.post('/api/newCategory', category.newCategory)
// get all categories from the user
router.get('/api/getCategory/:user', category.getCategory)
// delete category
router.delete('/api/deleteCategory/:id/:user', category.deleteCategory)

// new holiday
router.post('/api/book/:user', holiday.newHoliday)
// get all holidays
router.get('/api/books/:user', holiday.getHolidays)
// get month and array string of prices by param year 
router.get('/api/month/:user/:year', holiday.getMonth)

// get holiday by id
router.get('/api/book/:id', holiday.getHolidayById)
// update holiday
router.put('/api/book/:id', holiday.editBook)
// delete holiday
router.delete('/api/book/:id', holiday.deleteHoliday)
// get all days between fecha_entrada and fecha_salida
router.get('/api/range/:user/', holiday.getDays)
// send email to user
router.post('/api/sendEmail', holiday.sendEmail)
// create property
router.post('/api/property/:user', properties.newProperty)
// get all properties
router.get('/api/property/:user', properties.getProperties)
// delete property
router.delete('/api/property/:id/:user', properties.deleteProperty)



module.exports = router