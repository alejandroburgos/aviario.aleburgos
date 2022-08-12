const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');


const UserScheme = new mongoose.Schema(
    {
        user: {
            type: String
        },
        password: {
            type: String
        },
        read_update: {
            type: Boolean
        },
        token: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('user', UserScheme)