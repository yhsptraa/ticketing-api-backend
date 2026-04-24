const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    rel: 'User',
    required: true
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    rel: 'Showtime',
    required: true
  },
  seat: {
    type: String,
    required: true
  },
  cinema: {
    type: String,
    required: true
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Ticket", ticketSchema);