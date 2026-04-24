const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    StudioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
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