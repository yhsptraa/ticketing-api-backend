const moviesRepository = require("./movies-repository");

async function addMovie(movieData) {
  const newMovie = await moviesRepository.create(movieData);
  return newMovie;
}

async function deleteMovie(id) {
  const deletedMovie = await moviesRepository.deleteById(id);
  if (!deletedMovie) {
    throw new Error("Movie can't be found or has been deleted");
  }
  return deletedMovie;
}

async function getAllMovies() {
  const movies = await moviesRepository.findAll();
  return movies;
}

async function getMovieById(id) {
  const movie = await moviesRepository.findById(id);
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;
}

async function getMoviesByStatus(status) {
  const validStatuses = ["ongoing", "released", "upcoming"];
  const statusLower = status.toLowerCase();

  if (!validStatuses.includes(statusLower)) {
    throw new Error(
      ` Status isn't valid, valid status : ${validStatuses.join(", ")} `,
    );
  }

  const movie = await moviesRepository.findByStatus(status);
  return movie;
}

async function getByStudio(studioId) {
  return await moviesRepository.findByStudioId(studioId);
};

module.exports = {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getMoviesByStatus,
  getByStudio
};