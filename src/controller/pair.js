const model = require('../models/pair.js')

// new pair with model
exports.newPair = async (req, res) => {
    const { user, numberPair, image, anillaMale, yearMale, colorMale, procedencyMale, notesMale, anillaFemale, yearFemale, colorFemale, procedencyFemale, notesFemale, generalNotes, arrPuestasParejas } = req.body
    const pair = new model({
        user,
        image,
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
        arrPuestasParejas
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

// getPairById with status
exports.getPairById = async (req, res) => {
    const { id } = req.params
    try {
        const pair = await model.findById(id)
        res.json({
            message: 'Pair found',
            pair: pair
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// editPair id
exports.editPair = async (req, res) => {
    const { id } = req.params
    const { user, image, numberPair, anillaMale, yearMale, colorMale, procedencyMale, notesMale, anillaFemale, yearFemale, colorFemale, procedencyFemale, notesFemale, generalNotes, arrPuestasParejas } = req.body
    try {
        const pair = await model.findByIdAndUpdate(id, {
            user,
            numberPair,
            image,
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
            arrPuestasParejas
        }, { new: true })
        res.json({
            message: 'Pair updated',
            // get all pairs from the user
            pair: await model.find({ user })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// get fechNacimiento and iniIncubacion from arrPuestasParejas by user
exports.getArrPuestasParejas = async (req, res) => {
    const { user } = req.params
    try {
        const pair = await model.find({ user })
        const arrPuestasParejas = pair.map((pair, i) => pair.arrPuestasParejas[i])
        // change name of objects of arrPuestasParejas
        const arrPuestasParejas2 = arrPuestasParejas.map((arrPuestasParejas, i) => {
            return {
                start: arrPuestasParejas.iniIncubacion,
                end: arrPuestasParejas.fechNacimiento,
                allDay: true
            }
        })
        res.json(arrPuestasParejas2)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}