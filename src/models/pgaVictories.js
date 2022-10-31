const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        idPlayer: {
            type: Number,
        },
        victory: {
            type: Number,
        },
        player: {
            type: String
        },
        date: {
            type: String
        },
        course: {
            type: String
        },
        golpes: {
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('golfVictories', UserScheme)