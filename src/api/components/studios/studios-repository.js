const Studio = require('../../../models/studio');

async function findAll() {
    return await Studio.find();
};

async function create(studioData) {
    const studio = new Studio(studioData);
    return await studio.save();
};

module.exports = {
    findAll,
    create
};