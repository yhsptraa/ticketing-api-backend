const Movie = require('../../../models/movie');

async function findAll() {
    return await Movie.find();
};

async function create(movieData) {
    const movie = new Movie(movieData);
    return await movie.save(); 
};

module.exports = {
    findAll, 
    create
};