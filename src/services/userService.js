const userRepository = require('../repositories/userRepository');

async function getUserById(id) {
    return await userRepository.findById(id);
}

async function getAllUsers({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const { data, total } = await userRepository.findAll({ skip, limit });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function updateUser(id, data) {
    return await userRepository.updateById(id, data);
}

async function deleteUser(id) {
    return await userRepository.deleteById(id);
}

module.exports = { getUserById, getAllUsers, updateUser, deleteUser };