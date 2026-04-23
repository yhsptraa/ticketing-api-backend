const User = require('../../../models/user');

async function findByEmail(email) {
    return await User.findOne({ email });
}

async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

async function countByRole(role) {
    return await User.countDocuments({ role });
}

module.exports = { findByEmail, create, countByRole };