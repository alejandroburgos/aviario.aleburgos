const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },  
        numberPair: {
            type: Number,
            required: true
        },
        anillaMale: {
            type: String,
        },
        yearMale: {
            type: String,
        },
        colorMale: {
            type: Array,
        },
        procedencyMale: {
            type: String,
        },
        notesMale: {
            type: String,
        },
        anillaFemale: {
            type: String,
        },
        yearFemale: {
            type: String,
        },
        colorFemale: {
            type: Array,
        },
        procedencyFemale: {
            type: String,
        },
        notesFemale: {
            type: String,
        },
        generalNotes: {
            type: String,
        }, 
        puestas: {
            type: String,
        },
        numHuevos: {
            type: String,
        },
        iniIncubacion: {
            type: String,
        },
        huevosClaros: {
            type: String,
        },
        fechNacimiento: {
            type: String,
        },
        numAnillas: {
            type: String,
        },
        observaciones: {
            type: String,
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('pairs', UserScheme)