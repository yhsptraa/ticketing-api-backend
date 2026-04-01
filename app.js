require('dotenv').config()

// MongoDB
const mongoose = require('mongoose');

// Express
const express = require('express');
const app = express();

app.use(express.json());

const ticketRoutes = require('./src/routes/ticketRoutes');
app.use('/api', ticketRoutes);


app.get('/', (req,res) => {
    res.send('API Running');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Data Base Connected'))
        .catch(err => console.log(err));
}