function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const type = err.type || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Internal server error';

    return res.status(status).json({ error: type, message });
}

module.exports = errorHandler;
