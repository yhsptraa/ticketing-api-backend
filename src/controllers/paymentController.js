const paymentModel = require('../models/payment');
const ticketModel = require('../models/ticket');
const paymentRepository = require('../repositories/paymentRepository');

// membuat pembayaran baru
async function createPayment(req, res, next) {
    try {
        const { ticketId, userId} = req.body;

        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const payment = new paymentModel({
            ticketId,
            userId,
            amount: ticket.price
        });
        await payment.save();

        return res.status(201).json(payment);
    } catch (err) {
        return next(err); 
    }
}
// mendapatkan semua pembayaran
async function getPayments(res, next) {
    try {
        const payments = await paymentRepository.findAll();

        return res.json(payments);
    } catch (err) {
        return next(err);
    }
}
// mendapatkan pembayaran berdasarkan ID
async function getPaymentById(req, res, next) {
    try {
        const payment = await paymentModel
            .findById(req.params.id)
            .populate('ticketId')
            .populate('userId');

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        return res.json(payment);
    } catch (err) {
        return next(err);
    }
}
// memperbarui status pembayaran
async function updatePaymentStatus(req, res, next) {
    try {
        const { status } = req.body;

        const payment = await paymentModel.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();

        return res.json(payment);
    } catch (err) {
        return next(err);
    }
}
// menghapus pembayaran
async function deletePayment(req, res, next) {
    try {
        const payment = await paymentModel.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        await payment.deleteOne();

        return res.json({ message: 'Payment deleted' });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePaymentStatus,
    deletePayment
};