const userService = require('../services/userService');

/**
 * Register user
 */
async function register(req, res, next) {
    try {
        const { name, email, password, password_confirm } = req.body;

        // 1. Check password confirmation
        if (password !== password_confirm) {
            return res.status(400).json({ error: 'Password confirmation mismatched' });
        }

        // 2. Check if email already exists
        const emailIsRegistered = await userService.emailIsRegistered(email);
        if (emailIsRegistered) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // 3. Create user
        const user = await userService.createUser(name, email, password);
        if (!user) {
            return res.status(422).json({ error: 'Failed to create user' });
        }

        // 4. Success response
        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        return next(err);
    }
}

/**
 * Login user
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // 1. Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 2. Call service
        const result = await userService.login(email, password);
        if (!result) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // 3. Success
        return res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (err) {
        return next(err);
    }
}

/**
 * Get current logged in user
 */
async function getMe(req, res, next) {
    try {
        const user = await userService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }
        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = { register, login, getMe };
