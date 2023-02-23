const model = require('../models/holidays.js')

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