const express = require('express');
const router = express.Router();
const ticketController = require('./tickets-controller');
const { authMiddleware, isAdmin } = require('../../../middleware');

router.get('/tickets', authMiddleware, ticketController.getAllTickets);
router.get('/tickets/:id', authMiddleware, ticketController.getTicketById);
router.post('/tickets', authMiddleware, ticketController.createTicket);
router.patch('/tickets/:id', authMiddleware, isAdmin, ticketController.updateTicket);   // admin only
router.delete('/tickets/:id', authMiddleware, isAdmin, ticketController.deleteTicket);  // admin only

module.exports = router;