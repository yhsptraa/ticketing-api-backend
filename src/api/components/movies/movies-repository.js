const Movie = require('../../../models/movie');


async function create(movieData) {
    const movie = new Movie(movieData);
    return await movie.save(); 
};

async function deleteById(id) {
    return await Movie.findByIdAndDelete(id);
};

async function findAll() {
    return await Movie.find();
};

async function findByTitle(title) {
    return await Movie.find({ title: {$regex: title, $options: 'i'} });
};

async function findByStatus(status) {
    return await Movie.find({ status: status});
};

async function findByStudioId(id) {
    return await Movie.find({ studioId }).populate("movieId")
};

module.exports = {
    create,
    deleteById,
    findAll,
    findById,
    findByStatus,
    findByStudioId
};