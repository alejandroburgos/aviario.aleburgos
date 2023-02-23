const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        localizador: {
            type: String
        },
        fecha_alta: {
            type: Date
        },
        fecha_entrada: {
            type: Date
        },
        fecha_salida: {
            type: Date
        },
        estado: {
            type: String
        },
        adultos: {
            type: Number
        },
        ninos: {
            type: Number
        },
        bebes: {
            type: Number
        },
        alojamiento: {
            type: String
        },
        precio: {
            type: Number
        },
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('holidays', UserScheme)