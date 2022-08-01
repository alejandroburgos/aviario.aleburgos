const model = require('../models/withdrawal')
const User = require('../models/user')
var moment = require('moment');  

// post money and user information
exports.withdrawal = async (req, res) => {
    const { user, money, type, date} = req.body
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
            date
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