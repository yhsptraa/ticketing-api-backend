const bookingsService = require('./bookings-service');

async function createBooking(req, res) {
    try {
        const userId = req.user.id;
        const { showtimeId, seats } = req.body;

        if(!showtimeId || ! seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'showtimeId and seats must be filled'
            });
        }

        const booking = await bookingsService.creaateBooking(userId, showtimeId, seats);

        return res.status(201).json({
            success: true,
            message: 'Booking created sucessfuly, process payments',
            data: booking
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createBooking
}