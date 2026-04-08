const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
// membuat pembayaran baru
router.post('/payments', paymentController.createPayment);
// mendapatkan semua pembayaran
router.get('/payments', paymentController.getPayments);
// mendapatkan pembayaran berdasarkan ID
router.get('/payments/:id', paymentController.getPaymentById);
// memperbarui status pembayaran
router.put('/payments/:id/status', paymentController.updatePaymentStatus);
// menghapus pembayaran
router.delete('/payments/:id', paymentController.deletePayment);
module.exports = router;

