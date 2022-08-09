const model = require('../models/pair.js')

// new pair with model
exports.newPair = async (req, res) => {
    const { user, numberPair, anillaMale, yearMale, colorMale, procedencyMale, notesMale, anillaFemale, yearFemale, colorFemale, procedencyFemale, notesFemale, generalNotes, puestas, numHuevos, iniIncubacion, huevosClaros, fechNacimiento, numAnillas, observaciones } = req.body
    const pair = new model({
        user,
        numberPair,
        anillaMale,
        yearMale,
        colorMale,
        procedencyMale,
        notesMale,
        anillaFemale,
        yearFemale,
        colorFemale,
        procedencyFemale,
        notesFemale,
        generalNotes,
        puestas,
        numHuevos,
        iniIncubacion,
        huevosClaros,
        fechNacimiento,
        numAnillas,
        observaciones
    })
    try {
        await pair.save()
        res.json({ 
            message: 'Pair created',
            // get all pairs from the user
            pair: await model.find({ user })
        
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// getPair
exports.getPair = async (req, res) => {
    const { user } = req.params
    try {
        const pair = await model.find({ user })
        res.json(pair)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// delete pair from id
exports.deletePair = async (req, res) => {
    const { id, user} = req.params
    try {
        await model.findByIdAndDelete(id)
        res.json({ 
            message: 'Pair deleted',
            // get all pairs from the user
            pair: await model.find({ user })
         })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}