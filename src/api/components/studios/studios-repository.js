const Studio = require('../../../models/studio');
const Movie = require('../../../models/movie');

async function findAll() {
    return await Studio.find();
};


async function create(studioData) {
    const studio = new Studio(studioData);
    return await studio.save();
};

async function findById(id) {
    return await Studio.findById(id);
};

async function deleteById(id) {
    return await Studio.findByIdAndDelete(id);
};

async function findSeatsByStudioId(studioId) {
    return await Studio.findById(studioId).select("seats")
};

module.exports = {
    findAll,
    create,
    findById,
    deleteById,
    findSeatsByStudioId
};