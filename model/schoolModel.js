const mongoose = require('mongoose');
const schoolModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

}, { timestamp: true })

module.exports = mongoose.model('School', schoolModel);
