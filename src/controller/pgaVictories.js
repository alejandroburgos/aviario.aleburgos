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
                data: [],
                victories: [],
                sum: 0
            })
        }

        // check if date exist in range
        const dateExist = range.find(date => date === moment(victory.date).format('DD/MM/YYYY'))
        if (dateExist) {
            // get index of player in weeklyReport
            const index = weeklyReport.findIndex(player => player.name === victory.player)
            // get index of date in range
            const indexDate = range.findIndex(date => date === moment(victory.date).format('DD/MM/YYYY'))
            // sum victories
            weeklyReport[index].data[indexDate] += victory.victory
            

            console.log(indexDate)
            

            

            // sum all victories
            weeklyReport[index].sum += victory.victory

            // add 0 to days without victory
            for (let i = 0; i < range.length; i++) {
                if (!weeklyReport[index].data[i]) {
                    weeklyReport[index].data[i] = 0
                }
            }


            // sum all victories
            weeklyReport[index].sum = weeklyReport[index].data.reduce((a, b) => a + b, 0)
        

            // const sum = weeklyReport[index].data.reduce((a, b) => a + b, 0);
            // weeklyReport[index].sum = sum

        }


    }

    return res.status(200).json({
        ok: true,
        range,
        players: weeklyReport
    })
}





// get monthly report of player
exports.getMonthlyReport = async (req, res) => {
    const { date } = req.params

    const victories = await model.find()

    // get all days of month
    const year = moment(date).format('YYYY')
    const month = moment(date).format('MM')

    // get all days depend on month and year
    const days = Array.apply(0, Array(moment(`${date}`, 'MM-YYYY').daysInMonth())).map(function(_,i){
        return moment(`${date}`, 'MM-YYYY').date(i+1).format('DD')
    })

    // weekly report of player from fromDate to toDate 
    const monthlyReport = []

    // get array like weeklyReport with victories
    for (let i = 0; i < victories.length; i++) {
        const victory = victories[i];

        // check if player exist in weeklyReport
        const playerExist = monthlyReport.find(player => player.name === victory.player)
        if (!playerExist) {
            monthlyReport.push({
                name: victory.player,
                data: [],
                victories: {}
            })
        }

        // check if date exist in days and month
        const dateExist = days.find(date => date === moment(victory.date).format('DD'))
        if (dateExist && moment(victory.date).format('MM') === month) {
            // get index of player in weeklyReport
            const index = monthlyReport.findIndex(player => player.name === victory.player)
            // get index of date in range
            const indexDate = days.findIndex(date => date === moment(victory.date).format('DD'))


            // sum all victories
            if (monthlyReport[index].data[indexDate]) {
                monthlyReport[index].data[indexDate] += victory.victory
                monthlyReport[index].victories[indexDate] = victories

            } else {
                monthlyReport[index].data[indexDate] = victory.victory
            }
        
            // add 0 to days without victory
            for (let i = 0; i < days.length; i++) {
                if (!monthlyReport[index].data[i]) {
                    monthlyReport[index].data[i] = 0
                }
            }
        }
    }

    return res.status(200).json({
        ok: true,
        range: days,
        players: monthlyReport
    })
}

// get victories of player in range date
exports.getVictoriesByPlayer = async (req, res) => {
    const { startDate, endDate, player } = req.params

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
                data: [],
                victories: []
            })
        }

        // console.log( moment(victory.date).format('DD/MM/YYYY'))
        // console.log(range, moment(victory.date).format('DD/MM/YYYY'))

        // check if date exist in range
        const dateExist = range.find(date => date === moment(victory.date).format('DD/MM/YYYY'))
        if (dateExist) {
            // get index of player in weeklyReport
            const index = weeklyReport.findIndex(player => player.name === victory.player)
            // get index of date in range
            const indexDate = range.findIndex(date => date === moment(victory.date).format('DD/MM/YYYY'))
            // sum victories
            weeklyReport[index].data[indexDate] += victory.victory
            // sum all victories
            weeklyReport[index].sum = weeklyReport[index].data.reduce((a, b) => a + b, 0)

            // console.log(index, indexDate)

            // add 0 to days without victory
            for (let i = 0; i > weeklyReport[index].sum ; i++) {
                console.log(weeklyReport[index].data)
                if (!weeklyReport[index].data[i]) {
                    weeklyReport[index].data[i] = 0
                }
            }

            // get victories of player in range date
            if (weeklyReport[index].name === player) {
                weeklyReport[index].victories.push(victory)
            }
        }
    }

    // get victories of player
    const playerVictories = weeklyReport.find(playerVictory => playerVictory.name === player)

    return res.status(200).json({
        ok: true,
        range,
        playerVictories
    })
}