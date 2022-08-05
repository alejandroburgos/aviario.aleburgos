const model = require('../models/withdrawal')
const User = require('../models/user')
var moment = require('moment');  

// post money and user information
exports.withdrawal = async (req, res) => {
    const { user, money, type, date, description} = req.body
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    // if req.body insert in db
    if (req.body.user && req.body.money) {
        const withdrawal = new model({
            user,
            money,
            type,
            date,
            description
        })
        await withdrawal.save()
        return res.status(201).json({
            ok: true,
            withdrawal: await model.find({ user }),
            message: 'withdrawal created'
        })
    }
}    

// getAllWithdrawal of user
exports.getAllWithdrawal = async (req, res) => {
    const { user } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.find({ user })
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'Withdrawal not found'
        })
    }

    return res.status(200).json({
        ok: true,
        withdrawal
    })
}

// return me array of object with month and sum of money
exports.getMonthlyReport = async (req, res) => {
    const { user } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.find({ user })
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'Withdrawal not found'
        })
    }

    const month = Array.apply(0, Array(12)).map(function(_,i){return moment().month(i).format('MM')})

    // sum of money of each month
    const monthlyReport = month.map(month => {
        const sum = withdrawal.reduce((acc, cur) => {
            if (moment(cur.date).format('MM') === month) {
                return acc + cur.money
            }
            return acc
        }
        , 0)
        return sum
    })
    
    return res.status(200).json({
        ok: true,
        month,
        monthlyReport
    })
}

// get daily results by month and year of user
exports.getDailyReport = async (req, res) => {
    const { user, date } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.find({ user })
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'withdrawal not found'
        })
    }

    // get all days of month
    const year = moment(date).format('YYYY')
    const month = moment(date).format('MM')

    // get all days depend on month and year
    const days = Array.apply(0, Array(moment(`${date}`, 'MM-YYYY').daysInMonth())).map(function(_,i){return moment(`${date}`, 'MM-YYYY').date(i+1).format('DD')})

    // sum of money of each day of month and check year
    const data = days.map(day => {
        const sum = withdrawal.reduce((acc, cur) => {
            if (moment(cur.date).format('DD') === day && moment(cur.date).format('MM') === month && moment(cur.date).format('YYYY') === year) {
                return acc + cur.money
            }
            return acc
        }
        , 0)
        return sum
    }
    )

    return res.status(200).json({
        ok: true,
        days,
        data
    })
}

// get the daily revenue filtered by month with parameters user and month
exports.getDayReport = async (req, res) => {
    const { user, month } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.find({ user })
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'Revenue not found'
        })
    }

    // get all days of month
    const year = moment().format('YYYY')
    const days = Array.apply(0, Array(moment(`${month}/01/${year}`, 'MM/DD/YYYY').daysInMonth())).map(function(_,i){return moment(`${month}/01/${year}`, 'MM/DD/YYYY').add(i, 'days').format('DD')})

    // sum of money of each day
    const data = days.map(day => {
        const sum = withdrawal.reduce((acc, cur) => {
            if (moment(cur.date).format('DD') === day && moment(cur.date).format('MM') === month) {
                return acc + cur.money
            }
            return acc
        }
        , 0)
        return sum
    }
    )
    return res.status(200).json({
        ok: true,
        days,
        data
    })
}

// get range of revenue with two dates and return all revenue of user
exports.getWeeklyReport = async (req, res) => {
    const { user, startDate, endDate } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.find({ user })
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'withdrawal not found'
        })
    }

    // get range of start and end date
    var enumerateDaysBetweenDates = function(startDate, endDate) {
        var now = startDate, dates = [];
        while (now.isSameOrBefore(endDate)) {
                dates.push(now.format('MM/DD/YYYY'));
                now.add(1, 'days');
            }
            return dates;
    };
    
    var fromDate = moment(startDate);
    var toDate   = moment(endDate);
    var range = enumerateDaysBetweenDates(fromDate, toDate);

    // weekly report of user from fromDate to toDate
    const weeklyReport = range.map(day => {
        const sum = withdrawal.reduce((acc, cur) => {
            if (moment(cur.date).format('MM/DD/YYYY') === day) {
                return acc + cur.money
            }
            return acc
        }
        , 0)
        return sum
    }
    )

    return res.status(200).json({
        ok: true,
        range,
        data: weeklyReport
    })
}

exports.deleteWithdrawal = async (req, res) => {
    const { id, user} = req.body
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const withdrawal = await model.findByIdAndDelete(id)
    if (!withdrawal) {
        return res.status(400).json({
            ok: false,
            message: 'Revenue not found'
        })
    }

    return res.status(200).json({
        ok: true,
        withdrawal: await model.find({ user }),
        message: 'Revenue deleted',
        type: "withdrawal"
    })
}