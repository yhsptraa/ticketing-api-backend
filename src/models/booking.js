const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    Studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    seats: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmend', 'canceled', 'expired'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    }

}, { timestamp: true });

module.exports = mongoose.model('Booking', bookingSchema);