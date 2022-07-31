const model = require('../models/revenue')
const User = require('../models/user')

// post money and user information
exports.withdrawal = async (req, res) => {
    const { user, money } = req.body
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
            money
        })
        await withdrawal.save()
        return res.status(201).json({
            ok: true,
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