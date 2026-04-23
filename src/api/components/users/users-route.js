const express = require('express');
const router = express.Router();
const userController = require('./users-controller');
const { authMiddleware, isAdmin } = require('../../../middleware');

// GET /api/users/me
router.get('/me', authMiddleware, userController.getMe);

// GET /api/users - admin only
router.get('/', authMiddleware, isAdmin, userController.getAllUsers);

// GET /api/users/:id - admin only
router.get('/:id', authMiddleware, isAdmin, userController.getUserById);

// PUT /api/users/:id - admin only
router.put('/:id', authMiddleware, isAdmin, userController.updateUser);

// DELETE /api/users/:id - admin only
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
