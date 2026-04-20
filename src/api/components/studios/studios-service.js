const studiosRepository = require('./studios-repository');

async function getAllStudios() {
    const studios = await studiosRepository.findAll();
    return studios;
}

async function addStudio(studioData) {
    const newStudio = await studiosRepository.create(studioData);
    return(newStudio);
}

module.exports = {
    getAllStudios,
    addStudio
}