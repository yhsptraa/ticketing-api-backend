const express = require('express');
const router = express.Router();
const paymentController = require('./payments-controller');
// membuat pembayaran baru
// POST /api/payments
router.post('/', paymentController.createPayment);
// mendapatkan semua pembayaran
// GET /api/payments
router.get('/', paymentController.getPayments);
// mendapatkan pembayaran berdasarkan ID
// GET /api/payments/:id
router.get('/:id', paymentController.getPaymentById);
// memperbarui status pembayaran
// PUT /api/payments/:id
router.put('/:id/status', paymentController.updatePaymentStatus);
// menghapus pembayaran
// DELETE /api/payments/:id
router.delete('/:id', paymentController.deletePayment);
module.exports = router;
