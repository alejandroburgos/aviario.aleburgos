const model = require('../models/calendar.js')

// new calendar with model
exports.newCalendar = async (req, res) => {
    const { user, title, start, end, allDay, color } = req.body
    const calendar = new model({
        user,
        title,
        start,
        end,
        allDay,
        color
    })
    try {
        await calendar.save()
        res.json({ 
            message: 'Calendar created',
            // get all calendars from the user
            calendar: await model.find({ user })
        
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// get all calendars from the user
exports.getCalendar = async (req, res) => {
    try {
        res.json(await model.find({ user: req.params.user }))
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
