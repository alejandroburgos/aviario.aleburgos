const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        id: {
            type: String
        },
        user: {
            type: String
        },
        title: {
            type: String
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        allDay: {
            type: String
        },
        color: {
            type: String
        }
        
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('calendar', UserScheme)