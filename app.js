require('dotenv').config()

// MongoDB
const mongoose = require('mongoose');

// Express
const express = require('express');
const app = express();

// Routes
const ticketRoutes = require('./src/routes/ticketRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const port = process.env.PORT ? process.env.PORT : 3000;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));


app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('TIARA BACKEND NYALA');
});

// Mount routes
app.use('/api', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Start server
app.listen(port, () => {
    console.log(` Server running on port ${port} `);
});