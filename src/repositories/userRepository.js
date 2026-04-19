const User = require('../models/user');

async function findById(id) {
    return await User.findById(id).select('-password');
}

async function findAll({ skip = 0, limit = 10 } = {}) {
    const [data, total] = await Promise.all([
        User.find().select('-password').skip(skip).limit(limit),
        User.countDocuments()
    ]);
    return { data, total };
}

async function updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
}

async function deleteById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = { findById, findAll, updateById, deleteById };