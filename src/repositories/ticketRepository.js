const Ticket = require('../models/ticket');

const getAllTickets = () => {
  return Ticket.find();
};

const getTicketById = (id) => {
  return Ticket.findById(id);
};

const createTicket = (data) => {
  return Ticket.create(data);
};

const updateTicket = (id, data) => {
  return Ticket.findByIdAndUpdate(id, data, { new: true });
};

const deleteTicket = (id) => {
  return Ticket.findByIdAndDelete(id);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};