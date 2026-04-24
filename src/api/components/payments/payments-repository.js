const Payment = require('../../../models/payment');

async function create(data, session) {
    try {
        const payment = new Payment(data);
        return await payment.save({session});
    } catch (error) {
        throw error;
    }
}
async function findByBookingId(bookingId) {
    return await Payment.findOne({ booking: bookingId });
}
async function findAll() {
    return Payment.find().populate('ticketIds').populate('userId');
}
async function findById(id) {
    return Payment.findById(id).populate('ticketIds').populate('userId');
}
module.exports = {
    create,
    findByBookingId,
    findAll,
    findById
}
