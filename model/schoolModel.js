const mongoose = require('mongoose');
const schoolModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },

}, { timestamp: true })

module.exports = mongoose.model('School', schoolModel);
