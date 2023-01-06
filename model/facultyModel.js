const mongoose = require('mongoose')

const facultyModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    }
})
module.exports = mongoose.model('Faculty', facultyModel)