const User = require('../models/user');

/**
 * Get user by email
 */
async function findByEmail(email) {
    return await User.findOne({ email });
}

/**
 * Get user by ID
 */
async function findById(id) {
    return await User.findById(id);
}

/**
 * Create user
 */
async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

module.exports = { findByEmail, findById, create };
