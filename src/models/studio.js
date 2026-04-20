const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    "cinema": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        enum: [ 'Regular', 'Premiere', 'Imax', '3D' ],
        default: 'Regular'
    },
    "capacity": {
        type: Number,
        default: 60,
        min: 30
    },
    "seatLayout": [{
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