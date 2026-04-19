const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const pinoHTTP = require('pino-http');

const config = require('./config');
const logger = require('./logger')('app');
const { errorResponder, errorTypes } = require('./errors');

const ticketRoutes = require('../routes/ticketRoutes');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');
const paymentRoutes = require('../routes/paymentRoutes');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.use(require('method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pinoHTTP({ logger }));

// Connect DB
mongoose
    .connect(config.mongoUri)
    .then(() => logger.info('Database connected'))
    .catch((err) => logger.error(err, 'Database connection failed'));

// Root route
app.get('/', (req, res) => res.send('BACKEND TICKET BOOKING API'));

// API Routes
app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/users`, userRoutes);
app.use(`${config.api.prefix}`, ticketRoutes);
app.use(`${config.api.prefix}/payments`, paymentRoutes);

// Handle 404
app.use((req, res, next) =>
    next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'))
);

// Error logger
app.use((error, req, res, next) => {
    const ctx = {
        code: error.code,
        status: error.status,
        description: error.description,
    };
    if (error.stack) ctx.stack = error.stack;
    logger.error(ctx, error.toString());
    return next(error);
});

// Error response
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) =>
    res.status(error.status || 500).json({
        statusCode: error.status || 500,
        error: error.code || 'UNKNOWN_ERROR',
        description: error.description || 'Unknown error',
        message: error.message || 'An error has occurred',
    })
);

module.exports = app;
