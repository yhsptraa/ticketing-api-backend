const Payment = require('../models/payment');

async function create(data) {
    try {
        const payment = new Payment(data);
        await payment.save();
        return payment;
    } catch (error) {
        throw error;
    }
}

async function findAll() {
    return Payment.find().populate('ticketId').populate('userId');
}

async function findById(id) {
    return Payment.findById(id).populate('ticketId').populate('userId');
}

module.exports = {
    create,
    findAll,
    findById
}