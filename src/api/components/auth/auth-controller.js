const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// Register user baru
async function register(req, res, next) {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (password !== password_confirm) {
            throw errorResponder(errorTypes.VALIDATION, 'Password confirmation mismatched');
        }

        const emailIsRegistered = await authService.emailIsRegistered(email);
        if (emailIsRegistered) {
            throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already registered');
        }

        const user = await authService.createUser(name, email, password);
        if (!user) {
            throw errorResponder(errorTypes.SERVER, 'Failed to create user');
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

// Register admin user (admin only, max 3 admins)
async function adminRegister(req, res, next) {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (password !== password_confirm) {
            throw errorResponder(errorTypes.VALIDATION, 'Password confirmation mismatched');
        }

        const adminCount = await authService.countAdmins();
        if (adminCount >= 3) {
            throw errorResponder(errorTypes.VALIDATION, 'Maximum number of admin accounts (3) has been reached');
        }

        const emailIsRegistered = await authService.emailIsRegistered(email);
        if (emailIsRegistered) {
            throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already registered');
        }

        const user = await authService.createUserWithRole(name, email, password, 'admin');
        if (!user) {
            throw errorResponder(errorTypes.SERVER, 'Failed to create admin');
        }

        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
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
            throw errorResponder(errorTypes.VALIDATION, 'Email and password are required');
        }

        const result = await authService.login(email, password);
        if (!result) {
            throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Wrong email or password');
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

module.exports = { register, adminRegister, login };