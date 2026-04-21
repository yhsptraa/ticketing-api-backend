const Studio = require('../../../models/studio');

async function findAll() {
    return await Studio.find();
};


async function create(studioData) {
    const studio = new Studio(studioData);
    return await studio.save();
};

async function findById(id) {
    return await Studio.findById(id);
}

async function deleteById(id) {
    return await Studio.findByIdAndDelete(id);
}

module.exports = {
    findAll,
    create,
    findById,
    deleteById
};