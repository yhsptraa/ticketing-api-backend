require('dotenv').config()

// MongoDB
const mongoose = require('mongoose');

// Express
const express = require('express');
const app = express();

// Routes
const ticketRoutes = require('./src/routes/ticketRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const port = process.env.PORT || 3000;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('BACKEND TICKET BOOKING API');
});

// Routes
app.use('/api', ticketRoutes);        // → /api/tickets
app.use('/api/auth', authRoutes);     // → /api/auth
app.use('/api/users', userRoutes);    // → /api/users
app.use('/api/payments', paymentRoutes); // → /api/payments

// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});