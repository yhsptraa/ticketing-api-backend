const paymentRepository = require('./payments-repository');
const ticketModel = require('../../../models/ticket');

async function createPayment(ticketId, userId) {
    try {
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) return null;

        const payment = await paymentRepository.create({
            ticketId,
            userId,
            amount: ticket.price
        });
        return payment;
    } catch (err) {
        return null;
    }
}
async function getPayments() {
    try {
        return await paymentRepository.findAll();
    } catch (err) {
        return null;
    }
}
async function getPaymentById(id) {
    try {
        return await paymentRepository.findById(id);
    } catch (err) {
        return null;
    }
}
async function updatePaymentStatus(id, status) {
    try {
        const payment = await paymentRepository.findById(id);
        if (!payment) return null;
        payment.status = status;
        await payment.save();
        return payment;
    } catch (err) {
        return null;
    }
}
async function deletePayment(id) {
    try {
        const payment = await paymentRepository.findById(id);
        if (!payment) return null;
        await payment.deleteOne();

        return true;
    } catch (err) {
        return null;
    }
}
module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePaymentStatus,
    deletePayment
};
