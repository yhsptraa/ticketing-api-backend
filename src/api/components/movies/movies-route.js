const express = require('express');
const router = express.Router();
const moviesController = require('./movies-controller');
const { authMiddleware, isAdmin } = require('../../../middleware');

// POST /api/movies (admin only)
router.post('/', authMiddleware, isAdmin, moviesController.addMovie);

// DELETE /api/movies/:id (admin only)
router.delete('/:id', authMiddleware, isAdmin, moviesController.deleteMovie);

// GET /api/movies
router.get('/', authMiddleware, moviesController.getAllMovies);

// GET /api/movies/:id
router.get('/:id', authMiddleware, moviesController.getMovieById);

// GET /api/movies/status/:status
router.get('/status/:status', authMiddleware, moviesController.getMoviesByStatus);

module.exports = router;