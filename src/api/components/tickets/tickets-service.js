const mongoose = require('mongoose');
const ticketRepository = require('./tickets-repository');
const paymentRepository = require('../payments/payments-repository');

const getAllTickets = async () => {
  return await ticketRepository.getAllTickets();
};

const getTicketById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const ticket = await ticketRepository.getTicketById(id);
  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

const createTicket = async (data) => {
  const ticket = await ticketRepository.createTicket(data);

  const payment = await paymentRepository.createPayment({
    ticket_id: ticket._id,
    amount: ticket.price,
    status: "pending"
  });

  return { ticket, payment };
};

const updateTicket = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const updated = await ticketRepository.updateTicket(id, data);

  if (!updated) {
    throw new Error("Ticket not found");
  }

  return updated;
};

const deleteTicket = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const deleted = await ticketRepository.deleteTicket(id);

  if (!deleted) {
    throw new Error("Ticket not found");
  }

  return deleted;
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};