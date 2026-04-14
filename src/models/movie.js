const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    synopsis: String,
    duration_minutes:Number,
    release_date: Date,
    Status: String
},{
    timestamps:true
});

module.exports = mongoose.model('Movie', movieSchema);