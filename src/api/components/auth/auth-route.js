const express = require('express');
const router = express.Router();
const authController = require('./auth-controller');
const rateLimit = require('express-rate-limit');
const { errorTypes, errorResponder } = require('../../../core/errors');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res, next) => {
        next(errorResponder(
            errorTypes.TOO_MANY_REQUESTS,
            'Too many login attempts, please try again after 15 minutes.'
        ));
    }
});

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', loginLimiter, authController.login);

module.exports = router;