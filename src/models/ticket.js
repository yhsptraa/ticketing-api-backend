const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  price: Number,
  date: String,
  seat: String
});

module.exports = mongoose.model('Ticket', ticketSchema);