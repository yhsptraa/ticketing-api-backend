const ticketRepository = require('../repositories/ticketRepository');

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
  return await ticketRepository.createTicket(data);
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