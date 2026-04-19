const movieServices  =  require('./movies-service');

async function getAllMovies(req, res) {
    try {
        const movies = await movieServices.getAllMovies();
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

async function addMovie(req, res) {
    try {
        const newMovie = await movieServices.addMovie(req.body);

        res.status(201).json({
            success: true,
            data: newMovie
        });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message,
        });
    }
}



module.exports = { 
    getAllMovies, 
    addMovie
};
