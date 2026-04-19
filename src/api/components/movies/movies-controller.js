const Movie =  require('../../../models/movie');

// POST: Menambah Film Baru
async function createMovie(req, res) {
    try {
        const {title, synopsis, duration_minutes, release_date, status} = req.body;

        const newMovie = new Movie({
            title,
            synopsis,
            duration_minutes,
            release_date,
            status
        });

        const savedMovie = await newMovie.save();

        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// GET: Ambil seluruh Film
async function get(req, res) {
    try {
        const movies = await Movie.find().sort({createAt: -1});

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { createMovie, get };
