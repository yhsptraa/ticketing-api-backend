const express = require('express');
const router = express.Router();
const moviesController = require('./movies-controller');

// POST/api/movie
router.post('/', moviesController.createMovie)

// GET/api/movie
router.get('/', moviesController.get)

module.exports = router;
