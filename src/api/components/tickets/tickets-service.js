const ticketRepository = require('../repositories/ticketRepository');
const paymentRepository = require('../repositories/paymentRepository');

const getAllTickets = async () => {
  return await ticketRepository.getAllTickets();
};

const getTicketById = async (id) => {
  const ticket = await ticketRepository.getTicketById(id);
  if (!ticket) {
    throw new Error("Ticket not found");
  }
  return ticket;
};

const createTicket = async (data) => {
  // buat ticket
  const ticket = await ticketRepository.createTicket(data);

  // auto buat payment
  const payment = await paymentRepository.createPayment({
    ticket_id: ticket._id,
    amount: ticket.price,
    status: "pending"
  });

  return {
    ticket,
    payment
  };
};

const updateTicket = async (id, data) => {
  const updated = await ticketRepository.updateTicket(id, data);
  if (!updated) {
    throw new Error("Ticket not found");
  }
  return updated;
};

const deleteTicket = async (id) => {
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