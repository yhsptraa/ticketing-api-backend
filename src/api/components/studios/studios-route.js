const express = require('express');
const router = express.Router();
const studiosController = require('./studios-controller');

// GET /api/studios 
router.get('/', studiosController.getAllStudios);

// POST /api/studios
router.post('/', studiosController.addStudio);

// GET /api/studios/:Ld
router.get('/:id', studiosController.getStudio);

// DELETE /api/studios/:id
router.delete('/:id', studiosController.deleteStudio);

// GET /api/studios/:id/movies
router.get("/:id/movies", studiosController.getStudioMovies);

// GET /api/studios/:id/seats
router.get("/:id/seats", studiosController.getStudioSeats);

module.exports = router;