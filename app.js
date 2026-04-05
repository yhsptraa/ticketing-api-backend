require('dotenv').config()

// MongoDB
const mongoose = require('mongoose');

// Express
const express = require('express');
const app = express();

// Routes
const ticketRoutes = require('./src/routes/ticketRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('API Running');
});

// Mount routes
app.use('/api', ticketRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));
