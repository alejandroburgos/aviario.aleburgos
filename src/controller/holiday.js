const model = require('../models/holidays.js')
var moment = require('moment');  
var nodemailer = require('nodemailer');

// create new holiday
exports.newHoliday = async (req, res) => {
    const { localizador, fecha_alta, fecha_entrada, fecha_salida, estado, adultos, ninos, bebes, alojamiento, precio } = req.body
    const holiday = new model({
        localizador,
        fecha_alta,
        fecha_entrada,
        fecha_salida,
        estado,
        adultos,
        ninos,
        bebes,
        alojamiento,
        precio
    })
    try {
        // check if the holiday exists
        const holidays = await model.find()
        const holidayExists = holidays.find(holiday => holiday.localizador === localizador)
        
        if (holidayExists) {
            return res.status(400).json({
                message: `El localizador ${localizador} ya existe`
            })
        } else {
            await holiday.save()
            res.json({ 
                message: 'Reserva creada', 
                ok: true, 
                // response with all holidays
                data: await model.find()
            })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// get all holidays
exports.getHolidays = async (req, res) => {
    try {
        const holidays = await model.find()
        res.json(holidays)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
// get month and array string of prices by param years
exports.getMonth = async (req, res) => {
    try {
        // get holidays of year with all months
        const holidays = await model.find()
        const pYear = req.params.year
        const month = []
        for (let i = 0; i < 12; i++) {
            const monthHolidays = holidays.filter(holiday => {
                const month = new Date(holiday.fecha_entrada).getMonth()
                const year = new Date(holiday.fecha_entrada).getFullYear()
                return month === i && year === parseInt(pYear)
            })
            const monthPrice = monthHolidays.reduce((acc, holiday) => {
                return acc + holiday.precio
            }, 0)
            month.push({
                month: i,
                price: monthPrice,
            })
        }
        res.json({
            month,
            ok: true
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
// get holiday by id
exports.getHolidayById = async (req, res) => {
    try {
        const holiday = await model.findById(req.params.id)
        res.json(holiday)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// update holiday
exports.editBook= async (req, res) => {
    try {
        const { localizador, fecha_alta, fecha_entrada, fecha_salida, estado, adultos, ninos, bebes, alojamiento, precio } = req.body
        const holiday = await model.findByIdAndUpdate(req.params.id, {
            localizador,
            fecha_alta,
            fecha_entrada,
            fecha_salida,
            estado,
            adultos,
            ninos,
            bebes,
            alojamiento,
            precio
        })
        res.json({
            message: 'Reserva actualizada',
            ok: true,
            // response with all holidays
            data: await model.find()
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// delete holiday
exports.deleteHoliday = async (req, res) => {
    try {
        const holiday = await model.findByIdAndDelete(req.params.id)
        res.json({
            message: 'Reserva eliminada',
            ok: true,
            // response with all holidays
            data: await model.find()
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
// get all days between fecha_entrada and fecha_salida
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}
// get all days between fecha_entrada and fecha_salida
exports.getDays = async (req, res) => {
    try {
        const holidays = await model.find()
        const days = []
        holidays.forEach(holiday => {
                const daysBetween = getDates(holiday.fecha_entrada, holiday.fecha_salida)
                daysBetween.forEach(day => {
                    days.push(day)
                })
            
        })
        res.json({
            days,
            ok: true
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// send email to user
exports.sendEmail = async (req, res) => {
        try {
        const { email, subject, message, html } = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com ',
            port: 465,
            auth: {
                user: 'aleburgosmoreno@gmail.com',
                pass: 'qmrqkelaxazsqiqi'
            }
        })
        const mailOptions = {
            from: 'aleburgosmoreno@gmail.com',
            to: email,
            subject: subject,
            text: message,
            html: html
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: error })
            } else {
                res.json({
                    message: 'Email enviado',
                    ok: true
                })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

