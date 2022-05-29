const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Cars', CarSchema)