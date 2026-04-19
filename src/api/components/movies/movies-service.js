const movieRepository = require('./movies-repository');

async function getAllMovies() {
    const movies = await movieRepository.findAll();
    return movies;
}

async function addMovie(movieData) {
    const newMovie = await movieRepository.create(movieData);
    return(newMovie);
}

module.exports = {
    getAllMovies,
    addMovie
}