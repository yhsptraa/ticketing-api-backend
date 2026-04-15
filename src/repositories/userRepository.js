const User = require('../models/user');

async function findById(id) {
    return await User.findById(id);
}

async function findAll() {
    return await User.find();
}

async function updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = { findById, findAll, updateById, deleteById };