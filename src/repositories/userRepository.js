const User = require('../models/user');

async function findByEmail(email) {
    return await User.findOne({ email });
}

async function findById(id) {
    return await User.findById(id);
}

async function findAll() {
    return await User.find();
}

async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

async function updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = { findByEmail, findById, findAll, create, updateById, deleteById };
