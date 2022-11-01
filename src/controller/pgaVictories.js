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
    const { startDate, endDate } = req.params

    const victories = await model.find()


    // get range of start and end date
    var enumerateDaysBetweenDates = function(startDate, endDate) {
        var now = startDate, dates = [];
        while (now.isSameOrBefore(endDate)) {
                dates.push(now.format('DD/MM/YYYY'));
                now.add(1, 'days');
            }
        return dates;
    };
    
    var fromDate = moment(startDate);
    var toDate   = moment(endDate);
    var range = enumerateDaysBetweenDates(fromDate, toDate);

    
    // weekly report of player from fromDate to toDate 
    const weeklyReport = []

    // get array like weeklyReport with victories
    for (let i = 0; i < victories.length; i++) {
        const victory = victories[i];

        // check if player exist in weeklyReport
        const playerExist = weeklyReport.find(player => player.name === victory.player)
        if (!playerExist) {
            weeklyReport.push({
                name: victory.player,
                data: [
                    0, 0, 0, 0, 0, 0, 0
                ]
            })
        }

        // check if date exist in range
        const dateExist = range.find(date => date === moment(victory.date).format('DD/MM/YYYY'))
        if (dateExist) {
            // get index of player in weeklyReport
            const index = weeklyReport.findIndex(player => player.name === victory.player)
            // get index of date in range
            const indexDate = range.findIndex(date => date === moment(victory.date).format('DD/MM/YYYY'))
            // add victory to weeklyReport
            weeklyReport[index].data[indexDate] = victory.victory
        }
    }


    




    return res.status(200).json({
        ok: true,
        range,
        players: weeklyReport
    })
}