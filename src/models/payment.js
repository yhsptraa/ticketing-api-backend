const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        default: 'QRIS'
    },
    status: {
        type: String,
        enum: ['paid', 'failed', 'pending'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);