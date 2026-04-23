const express = require('express');
const router = express.Router();
const studiosController = require('./studios-controller');

// GET /api/studios 
router.get('/', studiosController.getAllStudios);

// POST /api/studios
router.post('/', studiosController.addStudio);

// GET /api/studios/:Ld
router.get('/:id', studiosController.getStudio);

// delete/studio/:id
router.delete('/:id', studiosController.deleteStudio);

// 
router.get("/studios/:id/events", studiosController.getStudioMovies)

module.exports = router;