const express = require('express');
const router = express.Router();
const moviesController = require('./movies-controller');

// POST /api/movies
router.post('/', moviesController.addMovie)

// GET /api/movies
router.get('/', moviesController.getAllMovies)

module.exports = router;
