; const ticketService = require('../services/ticketService');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json({
      message: "Success get all tickets",
      data: tickets
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.json(ticket);
  } catch (err) {
    if (err.message === "Ticket not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const ticket = await ticketService.createTicket(req.body);

    res.status(201).json({
      message: "Ticket created successfully, proceed to payment",
      data: ticket,
      payment_url: `/api/payments/${ticket._id}`
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const updated = await ticketService.updateTicket(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    if (err.message === "Ticket not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    if (err.message === "Ticket not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
