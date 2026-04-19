const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware');

// GET /api/users/me
router.get('/me', authMiddleware, userController.getMe);

// GET /api/users
router.get('/', authMiddleware, userController.getAllUsers);

// GET /api/users/:id
router.get('/:id', authMiddleware, userController.getUserById);

// PUT /api/users/:id
router.put('/:id', authMiddleware, userController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
