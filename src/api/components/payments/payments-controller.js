const paymentService = require('./payments-service');

// membuat pembayaran baru
async function createPayment(req, res, next) {
    try {
        const { ticketIds, userId } = req.body;
        const payment = await paymentService.createPayment(ticketIds, userId);
        return res.status(201).json(payment);
    } catch (err) {
        if (err.message === 'Some of the tickets were not found.') {
            return res.status(404).json({ error: err.message });
        }
        if (err.message === 'Some of the tickets have already been paid for.') {
            return res.status(400).json({ error: err.message });
        }
        return next(err);
    }
}
// mendapatkan semua pembayaran
async function getPayments(req, res, next) {
    try {
        const payments = await paymentService.getPayments();
        return res.json(payments);
    } catch (err) {
        return next(err);
    }
}
// mendapatkan pembayaran berdasarkan ID
async function getPaymentById(req, res, next) {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
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
        if (!['pending', 'paid', 'failed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const payment = await paymentService.updatePaymentStatus(req.params.id, status);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        return res.json(payment);
    } catch (err) {
        return next(err);
    }
}
// menghapus pembayaran
async function deletePayment(req, res, next) {
    try {
        const result = await paymentService.deletePayment(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Payment not found' });
        }
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
