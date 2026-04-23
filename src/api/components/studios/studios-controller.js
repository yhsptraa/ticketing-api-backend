const studiosServices = require('./studios-service');
const moviesServices = require('../movies/movies-service');

async function getAllStudios(req, res) {
    try {
        const studios = await studiosServices.getAllStudios();
        res.status(200).json({
            sucess: true, 
            count: studios.length,
            data: studios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

async function addStudio(req, res) {
    try {
        const newStudio = await studiosServices.addStudio(req.body);
        res.status(201).json({
            success: true,
            data: newStudio
        });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message
        });
    }
};

async function getStudio(req, res) {
    try {
        const { id } = req.params;
        const studio = await studiosServices.getStudio(id);
        res.status(200).json({
            success: true,
            data: studio
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
};

async function deleteStudio(req, res) {
    try {
        const { id } = req.params;
        const deletedStudio = await studiosServices.deleteStudio(id);
        res.status(200).json({
            success: true,
            data : deletedstudio
        })
    } catch (error) {
        res.status(404).json ({
            success: false,
            message: error.message
        })
    }
};

async function getStudioMovies(req, res) {
    try {
        const studioId = req.params.id;
        const movies = await moviesServices.getByStudio(studioId);
        res.status(201).json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

async function getStudioSeats(req, res) {
    try {
        const studioId = req.params.id;
        const seats = await studiosServices.getSeatsByStudio(studioId);
        res.status(201).json({
            success: true,
            data: seats
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        });
    }
};

module.exports = {
    getAllStudios,
    addStudio,
    getStudio,
    deleteStudio,
    getStudioMovies,
    getStudioSeats
};