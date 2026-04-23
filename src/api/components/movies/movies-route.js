const express = require('express');
const router = express.Router();
const moviesController = require('./movies-controller');

// POST /api/movies
router.post('/', moviesController.addMovie);

// DELETE /api/studios/:id
router.delete('/:id', moviesController.deleteMovie);

// GET /api/movies
router.get('/', moviesController.getAllMovies);

// GET /api/movies/:id
router.get('/:id', moviesController.getMovieById);

// GET /api/movies/:status
router.get('/status/:status', moviesController.getMoviesByStatus);


module.exports = router;