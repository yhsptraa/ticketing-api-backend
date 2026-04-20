const moviesServices  =  require('./movies-service');

async function addMovie(req, res) {
    try {
        const newMovie = await moviesServices.addMovie(req.body);

        res.status(201).json({
            success: true,
            data: newMovie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteMovie(req, res) {
    try {
        const { id } = req.params;
        const deletedMovie = await moviesServices.deleteMovie(id);

        res.status(200).json({
            success: true,
            message: "Movie successfully been deleted!",
            data: deletedMovie
        });
    } catch (error) {
        res.status(404).json({ 
            success: false, 
            message: error.message
        });
    }
}

async function getAllMovies(req, res) {
    try {
        const movies = await moviesServices.getAllMovies();
        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getMoviesByName(req, res) {
    try {
        const { title } = req.params;
        const movies = await moviesServices.getMoviesByName(title);

        res.status(200).json({
            sucess: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getMoviesByStatus(req, res) {
    try {
        const { status } = req.params;
        const movies = await moviesServices.getMoviesByStatus(status);

        res.status(200).json({
            sucess: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { 
    addMovie,
    deleteMovie,
    getAllMovies,
    getMoviesByName,
    getMoviesByStatus 
};
