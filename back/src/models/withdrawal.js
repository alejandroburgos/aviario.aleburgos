const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        user: {
            type: String
        },
        money: {
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('withdrawal', UserScheme)