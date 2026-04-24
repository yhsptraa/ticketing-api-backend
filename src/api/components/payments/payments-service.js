const paymentRepository = require('./payments-repository');
const ticketModel = require('../../../models/ticket');
const bookingRepository = require('../bookings/bookings-repository');
const ticketRepository = require('../tickets/tickets-repository');
const mongoose = require('mongoose');
const crypto = require('crypto');

async function processPayment(bookingId, paymentMethod, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const booking = await bookingRepository.findBookingById(bookingId).session(session)
        if (!booking) throw new Error("can't find booking record!");
        
        const paymentData = {
            booking: booking._id,
            user: booking.user,
            amount: amount,
            method: paymentMethod,
            status: 'paid'
        };
        const payment = await paymentRepository.create(paymentData, session);

        booking.status = 'confirmed',
        await booking.save({ session });

        const ticketsData = booking.seats.map(seatCode => ({
            booking: booking._id,
            payment: payment[0]._id,
            user: booking.user,
            showtime: booking.showtime,
            seat: seatCode,
            ticketCode: `TIX-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
        }));

        const tickets = await ticketRepository.createTickets(ticketsData, session);

        await session.commitTransaction();
        return { payment, tickets };

    } catch(error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
};
};
async function createPayment(ticketIds, userId) {
    const tickets = await ticketModel.find({ _id: { $in: ticketIds } });

    if (!tickets || tickets.length !== ticketIds.length) {
        throw new Error('Some of the tickets were not found.');
    }
    const alreadyPaid = tickets.filter(ticket => ticket.paymentId);
    if (alreadyPaid.length > 0) {
        throw new Error('Some of the tickets have already been paid for.');
    }
    const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
    const payment = await paymentRepository.create({
        ticketIds,
        userId,
        amount: totalAmount,
        status: 'paid'
    });
    await ticketModel.updateMany(
        { _id: { $in: ticketIds } },
        { $set: { paymentId: payment._id } }
    );
    return payment;
}
async function getPayments() {
    try {
        return await paymentRepository.findAll();
    } catch (err) {
        return null;
    }
}
async function getPaymentById(id) {
    try {
        return await paymentRepository.findById(id);
    } catch (err) {
        return null;
    }
}
async function updatePaymentStatus(id, status) {
    try {
        const payment = await paymentRepository.findById(id);
        if (!payment) return null;
        payment.status = status;
        await payment.save();
        return payment;
    } catch (err) {
        return null;
    }
}
async function deletePayment(id) {
    try {
        const payment = await paymentRepository.findById(id);
        if (!payment) return null;
        await payment.deleteOne();

        return true;
    } catch (err) {
        return null;
    }
}
module.exports = {
    processPayment,
    createPayment,
    getPayments,
    getPaymentById,
    updatePaymentStatus,
    deletePayment
};
