const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// POST/api/movie
routes.post('/', moviesController.createMovie)

// GET/api/movie
router.get('/', moviesController.getAllMovie)

module.exports = router;