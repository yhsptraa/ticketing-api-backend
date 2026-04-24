const Ticket = require('../../../models/ticket');

const getAllTickets = async () => {
  return await Ticket.find();
};

const getTicketById = async (id) => {
  return await Ticket.findById(id);
};

const createTickets = async (data, session) => {
  return await Ticket.create(data, {session});
};

const updateTicket = async (id, data) => {
  return await Ticket.findByIdAndUpdate(id, data, { new: true });
};

const deleteTicket = async (id) => {
  return await Ticket.findByIdAndDelete(id);
};

const findByBookingId = async (bookingId) => {
  return await Ticket.find({ booking: bookingId });
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTickets,
  updateTicket,
  deleteTicket,
  findByBookingId
};