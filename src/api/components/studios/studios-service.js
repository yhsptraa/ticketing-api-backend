const studiosRepository = require('./studios-repository');

async function getAllStudios() {
    const studios = await studiosRepository.findAll();
    return studios;
};

async function addStudio(studioData) {
    const newStudio = await studiosRepository.create(studioData);
    return(newStudio);
};

async function getStudio(id) {
    const studio = await studiosRepository.findById(id);

    if (!studio) {
        throw new Error("Studio not found")
    }

    return studio;
};

async function deleteStudio(id) {
    const deletedStudio = await studiosRepository.DeleteById(id);
    if (!deletedStudio) {
        throw new Error("Studio can't be found or has been deleted");
    }
    return deletedStudio;
};

async function getSeatsByStudio(studioId) {
    const studio = await studioRepository.findSeatByStudioId(studioId);

    if (!studio) {
        throw new Error("Studio not found")
    }

    return studio.seats;
};

module.exports = {
    getAllStudios,
    addStudio,
    getStudio,
    deleteStudio,
    getSeatsByStudio
}