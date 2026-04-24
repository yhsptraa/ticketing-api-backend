const mongoose = require('mongoose');
const BookingsRepository = require('./bookings-repository');
const PaymentsRepository = require('../payments/payments-repository');
const ticketRepository = require('../tickets/tickets-repository')
const Showtime = require('../../../models/showtime');

async function createBooking(userId, showtimeId, seats) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const showtime = await Showtime.findById(showtimeId).session(session)
        if (!showtime) throw new Error("can't found showtime");

        const studio = showtime.StudioId;
        const validSeatsInStudio = [];
        studio.seats.forEach(rowObj => {
            rowObj.seats.forEach(seatObj => {
                validSeatsInStudio.push(`${rowObj.row}${seatObj.seatNumber}`);
            })
        })

        const conflict = await BookingsRepository.findConflictBookings(showtimeId, seats, session);
        if (conflict) {
            throw new Error('seats is unavailable');
        }

        const totalPrice = showtime.price * seats.length;
        const expiredAt = new Date(Date.now() + 10 * 60 * 1000);

        const booking = await BookingsRepository.createBooking({
            user: userId,
            showtime: showtimeId,
            seat,
            totalPrice,
            expiredAt,
            status: 'Pending'
        }, session);
        
        const newBooking = await BookingsRepository.createBooking(bookingData, session);

        await session.commitTransaction();
        return booking;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

async function getBookingById(bookingId) {
    try {
        const [booking, payment, tickets] = await Promise.all([
            BookingsRepository.findBookingById(bookingId),
            PaymentsRepository.findByBookingId(bookingId),
            ticketRepository.findByBookingId(bookindId)
        ]);

        console.log("=== DETAIL BOOKING ===");
        console.log("Data Booking:", booking ? "Ditemukan" : "TIDAK Ditemukan");
        console.log("Data Payment:", payment ? `Ditemukan (Status: ${payment.status})` : "TIDAK Ditemukan");
        console.log("Jumlah Tiket:", tickets.length);

        return { booking, payment, tickets };
    } catch(error) {
        throw error
    }
}

module.exports = {
    createBooking,
    getBookingById
};
