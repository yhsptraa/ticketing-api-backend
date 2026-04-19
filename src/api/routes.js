const express = require('express');

const authRoute = require('./components/auth/auth-route');
const usersRoute = require('./components/users/users-route');
const ticketsRoute = require('./components/tickets/tickets-route');
const paymentsRoute = require('./components/payments/payments-route');
const moviesRoute = require('./components/movies/movies-route');

module.exports = () => {
    const router = express.Router();

    router.use('/auth', authRoute);
    router.use('/users', usersRoute);
    router.use('/', ticketsRoute);
    router.use('/payments', paymentsRoute);
    router.use('/movies', moviesRoute);

    return router;
};
