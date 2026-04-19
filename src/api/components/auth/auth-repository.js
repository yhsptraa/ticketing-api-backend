const User = require('../../../models/user');

async function findByEmail(email) {
    return await User.findOne({ email });
}

async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

module.exports = { findByEmail, create };
