const authService = require('../services/authService');

// Register user baru
async function register(req, res, next) {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (password !== password_confirm) {
            return res.status(400).json({ error: 'Password confirmation mismatched' });
        }

        const emailIsRegistered = await authService.emailIsRegistered(email);
        if (emailIsRegistered) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = await authService.createUser(name, email, password);
        if (!user) {
            return res.status(422).json({ error: 'Failed to create user' });
        }

        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        return next(err);
    }
}

// Login user
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await authService.login(email, password);
        if (!result) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (err) {
        return next(err);
    }
}

module.exports = { register, login };