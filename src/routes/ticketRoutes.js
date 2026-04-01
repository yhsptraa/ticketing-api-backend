const express = require('express');
const router = express.Router();

router.get('/tickets', (req, res) => {
    res.json([
        {
            event: 'Concert',
            price: 50000
        }
    ]);
});

router.post('/tickets', (req, res) => {
    res.json({
        message: 'Ticket created',
        data: req.body
    });
});

module.exports = router;