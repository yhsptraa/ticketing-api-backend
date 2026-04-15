const userService = require('../services/userService');

// Melihat profil user yang sedang login
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

// Melihat semua user
async function getAllUsers(_req, res, next) {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (err) {
        return next(err);
    }
}

// Melihat user berdasarkan ID
async function getUserById(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }
        return res.json(user);
    } catch (err) {
        return next(err);
    }
}

// Update user berdasarkan ID
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

// Hapus user berdasarkan ID
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

module.exports = { getMe, getAllUsers, getUserById, updateUser, deleteUser };
