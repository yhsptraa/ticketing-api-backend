const userRepository = require('../repositories/userRepository');

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

module.exports = { getUserById, getAllUsers, updateUser, deleteUser };