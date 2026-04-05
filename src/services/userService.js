const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

/**
 * Check if email already registered
 */
async function emailIsRegistered(email) {
    const user = await userRepository.findByEmail(email);
    return !!user;
}

/**
 * Register user
 */
async function createUser(name, email, password) {
    try {
        // 1. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Save user
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

/**
 * Login user
 */
async function login(email, password) {
    try {
        // 1. Find user
        const user = await userRepository.findByEmail(email);
        if (!user) return null;

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1d' }
        );

        // 4. Return result
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

/**
 * Get user by ID
 */
async function getUserById(id) {
    return await userRepository.findById(id);
}

module.exports = { emailIsRegistered, createUser, login, getUserById };
