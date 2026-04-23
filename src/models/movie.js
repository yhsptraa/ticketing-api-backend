const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    StudioId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 80
    },
    status: {
        type: String,
        enum: ['ongoing', 'released', 'upcoming'],
        default: 'Ongoing'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Movie', movieSchema);