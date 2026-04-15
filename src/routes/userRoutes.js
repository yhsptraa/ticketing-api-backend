const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// POST /api/users/register
router.post('/register', userController.register);

// POST /api/users/login
router.post('/login', userController.login);

// GET /api/users/me
router.get('/me', auth, userController.getMe);

// GET /api/users
router.get('/', auth, userController.getAllUsers);

// PUT /api/users/:id
router.put('/:id', auth, userController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
