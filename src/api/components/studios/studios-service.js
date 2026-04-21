const studiosRepository = require('./studios-repository');

async function getAllStudios() {
    const studios = await studiosRepository.findAll();
    return studios;
}

async function addStudio(studioData) {
    const newStudio = await studiosRepository.create(studioData);
    return(newStudio);
}

async function getStudio(id) {
    const studio = await studiosRepository.findById(id);
    return studio;
}

async function deleteStudio(i) {
    const deletedStudio = await studiosRepository.DeleteById(id);
    if (!deletedStudio) {
        throw new Error("Studio can't be found or has been deleted");
    }
    return deletedStudio;
}

module.exports = {
    getAllStudios,
    addStudio,
    getStudio,
    deleteStudio
}