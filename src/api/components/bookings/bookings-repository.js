const mongoose = require('mongoose');
const Booking = require('../../../models/booking');

async function findConflictBookings(showtimeId, seats, session) {
        return await Booking.findOne({
            showtime: showtimeId,
            seats: { $in: seats },
            status: { $in: ['pending', 'confirmed'] }
        }).session(session);
    }

async function createBooking(bookingData, session) {
        const booking = new Booking(bookingData);
        return await booking.save({ session });
    }    

async function findBookingById(id) {
    return await Booking.findById(id);
}

module.exports = {
    findConflictBookings,
    createBooking,
    findBookingById
}