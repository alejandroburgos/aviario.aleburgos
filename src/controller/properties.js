const model = require('../models/properties.js')
var moment = require('moment');  

// create property only with name for user
exports.newProperty = async (req, res) => {
    const { name } = req.body
    const property = new model({
        name
    })
    try {
        // check if the property exists
        const properties = await model.find()
        const propertyExists = properties.find(property => property.name === name)
        
        if (propertyExists) {
            return res.status(400).json({
                message: `La propiedad ${name} ya existe`
            })
        } else {
            await property.save()
            res.json({ 
                message: 'Propiedad creada', 
                ok: true, 
                // response propierties from user
                data: await model.find()
            })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// get properties from the model
exports.getProperties = async (req, res) => {
    try {
        const properties = await model.find()
        res.json(properties)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// delete property
exports.deleteProperty = async (req, res) => {
    const { id } = req.params
    try {
        await model.findByIdAndDelete(id)
        res.json({ 
            message: 'Propiedad eliminada', 
            ok: true, 
            // response propierties from user
            data: await model.find()
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}