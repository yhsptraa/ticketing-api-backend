const express = require('express');
const router = express.Router();
const studiosController = require('./studios-controller');

// GET /api/studios 
router.get('/', studiosController.getAllStudios);

// POST /api/studios
router.post('/', studiosController.addStudio);


module.exports = router;