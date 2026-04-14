const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
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
  studio: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);