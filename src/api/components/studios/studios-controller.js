const studiosServices = require('./studios-service');

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
}

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
}

module.exports = {
    getAllStudios,
    addStudio
};