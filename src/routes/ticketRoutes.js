const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

router.get('/tickets', (req, res) => {
    res.json([{ event: "Concert", price: 50000 }]);
});

router.get('/tickets/:id', (req, res) => {
    res.json({
        id: req.params.id,
        event: "Concert",
        price: 50000
    });
});

router.post('/tickets', async (req, res) => {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.json(ticket);
});

module.exports = router;