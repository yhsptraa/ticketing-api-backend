const express = require('express');
const router = express.Router();
const paymentController = require('./payments-controller');
const { authMiddleware, isAdmin } = require('../../../middleware');

// membuat pembayaran baru
// POST /api/payments
router.post('/', authMiddleware, paymentController.createPayment);
// mendapatkan semua pembayaran (admin only)
// GET /api/payments
router.get('/', authMiddleware, isAdmin, paymentController.getPayments);
// mendapatkan pembayaran berdasarkan ID
// GET /api/payments/:id
router.get('/:id', authMiddleware, paymentController.getPaymentById);
// memperbarui status pembayaran (admin only)
// PUT /api/payments/:id/status
router.put('/:id/status', authMiddleware, isAdmin, paymentController.updatePaymentStatus);
// menghapus pembayaran (admin only)
// DELETE /api/payments/:id
router.delete('/:id', authMiddleware, isAdmin, paymentController.deletePayment);

module.exports = router;