const model = require('../models/revenue')
const User = require('../models/user')

// post money and user information
exports.revenue = async (req, res) => {
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
        const revenue = new model({
            user,
            money
        })
        await revenue.save()
        return res.status(201).json({
            ok: true,
            message: 'Revenue created'
        })
    }
}

//  getAll revenue of user
exports.getAllRevenue = async (req, res) => {
    const { user } = req.params
    const userDB = await User.findOne({ user })
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    const revenue = await model.find({ user })
    if (!revenue) {
        return res.status(400).json({
            ok: false,
            message: 'Revenue not found'
        })
    }

    return res.status(200).json({
        ok: true,
        revenue
    })
}