const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

async function emailIsRegistered(email) {
    const user = await userRepository.findByEmail(email);
    return !!user;
}

async function createUser(name, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: 'customer'
        });
        return user;
    } catch (err) {
        return null;
    }
}

async function login(email, password) {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    } catch (err) {
        return null;
    }
}

async function getUserById(id) {
    return await userRepository.findById(id);
}

async function getAllUsers() {
    return await userRepository.findAll();
}

async function updateUser(id, data) {
    return await userRepository.updateById(id, data);
}

async function deleteUser(id) {
    return await userRepository.deleteById(id);
}

module.exports = { emailIsRegistered, createUser, login, getUserById, getAllUsers, updateUser, deleteUser };
