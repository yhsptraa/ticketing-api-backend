const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

/**
 * Register
 * POST /api/users/register
 */
router.post('/register', userController.register);

/**
 * Login
 * POST /api/users/login
 */
router.post('/login', userController.login);

/**
 * Get current logged in user
 * GET /api/users/me
 */
router.get('/me', auth, userController.getMe);

module.exports = router;
