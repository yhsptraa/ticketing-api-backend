const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');

async function emailIsRegistered(email) {
    const user = await authRepository.findByEmail(email);
    return !!user;
}

async function createUser(name, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await authRepository.create({
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
        const user = await authRepository.findByEmail(email);

        // Always run bcrypt even if user not found to prevent timing attacks
        const userPassword = user ? user.password : '<RANDOM_FILLER>';
        const isMatch = await bcrypt.compare(password, userPassword);

        if (user && isMatch) {
            const token = jwt.sign(
                { id: user._id },
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
        }

        return null;
    } catch (err) {
        return null;
    }
}

module.exports = { emailIsRegistered, createUser, login };
