const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    studioId: {
        type: Schema.Types.ObjectId,
        ref: 'Studio'
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [ 'Regular', 'Premiere', 'Imax', '3D' ],
        default: 'Regular'
    },
    capacity: {
        type: Number,
        default: 60,
        min: 30
    },
    seats: [{
        row: {
            type: String, 
            required: true
        },
        seats: [{
            seatNumber: { 
                type: Number, 
                required: true
            },
            seatType : {
                type: String, 
                enum : ['Regular', 'Sweetbox', 'Satin', 'Velvet'], 
                default: 'Regular'
            },
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Studio', studioSchema);