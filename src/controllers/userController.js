const userService = require('../services/userService');

async function register(req, res, next) {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (password !== password_confirm) {
            return res.status(400).json({ error: 'Password confirmation mismatched' });
        }

        const emailIsRegistered = await userService.emailIsRegistered(email);
        if (emailIsRegistered) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = await userService.createUser(name, email, password);
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

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await userService.login(email, password);
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

async function getAllUsers(_req, res, next) {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (err) {
        return next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }
        return res.json({ message: 'User berhasil diupdate', user });
    } catch (err) {
        return next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }
        return res.json({ message: 'User berhasil dihapus' });
    } catch (err) {
        return next(err);
    }
}

module.exports = { register, login, getMe, getAllUsers, updateUser, deleteUser };
