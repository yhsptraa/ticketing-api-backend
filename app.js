// Express
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send('API Running');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Data Base Connected')).catch(err => console.log(err));