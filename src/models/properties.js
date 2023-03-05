const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserScheme = new mongoose.Schema(
    {
        name: 'string',
    }
)

UserScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('properties', UserScheme)