const model = require('../models/pgaVictories.js')
var moment = require('moment');  

// add victories to db
exports.addVictories = async (req, res) => {
    const {idPlayer, player, date, course, golpes} = req.body
    const victory = new model({
        idPlayer,
        player,
        date,
        course,
        golpes,
        victory: 1
    })
    await victory.save()
    return res.status(200).json({
        ok: true,
        // get all victories 
        victory: await model.find(),
        message: 'Victory created'
    })
}

// get all victories
exports.getVictories = async (req, res) => {
    return res.status(200).json({
        ok: true,
        victories: await model.find()
    })
}

// delete victory
exports.deleteVictory = async (req, res) => {
    const { id } = req.params
    await model.findByIdAndDelete(id)
    return res.status(200).json({
        ok: true,
        message: 'Victory deleted'
    })
}

// get data by start and end date and player name
exports.getVictoriesByWeek = async (req, res) => {
    const { player, startDate, endDate } = req.params

    const victories = await model.find({ player })
    if (!victories) {
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
        const sum = victories.reduce((acc, cur) => {
            if (moment(cur.date).format('MM/DD/YYYY') === day) {
                return acc + cur.victory
            }
            return acc
        }, 0)
        return sum
    })

    // get weekly report of victories by player


    return res.status(200).json({
        ok: true,
        range,
        data: weeklyReport,
        player: player
    })
}