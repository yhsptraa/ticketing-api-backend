const express = require('express');
const router = express.Router();
const studiosController = require('./studios-controller');
const { authMiddleware, isAdmin } = require('../../../middleware');

// GET /api/studios 
router.get('/', authMiddleware, studiosController.getAllStudios);

// POST /api/studios (admin only)
router.post('/', authMiddleware, isAdmin, studiosController.addStudio);

// GET /api/studios/:id
router.get('/:id', authMiddleware, studiosController.getStudio);

// DELETE /api/studios/:id (admin only)
router.delete('/:id', authMiddleware, isAdmin, studiosController.deleteStudio);

// GET /api/studios/:id/movies
router.get("/:id/movies", authMiddleware, studiosController.getStudioMovies);

// GET /api/studios/:id/seats
router.get("/:id/seats", authMiddleware, studiosController.getStudioSeats);

module.exports = router;