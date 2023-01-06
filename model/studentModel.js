const mongoose = require('mongoose');

const studentModel = mongoose.Schema({
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
        type: String,
    },
    faculty: {
        type: String,
    }

})
module.exports = mongoose.model('Student', studentModel)


