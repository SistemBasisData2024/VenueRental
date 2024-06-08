const db = require('../database');

const createBooking = async (req, res) => {
    const { venue_id, event_date, duration } = req.body;
    const user_id = req.user.id;
    
    try {
        // Check availability
        const availabilityResult = await db.query(
            'SELECT * FROM bookings WHERE venue_id = $1 AND event_date = $2',
            [venue_id, event_date]
        );

        if (availabilityResult.rows.length > 0) {
            return res.status(400).json({ message: 'Venue is not available on this date' });
        }

        // Calculate total price (assuming price per day)
        const venueResult = await db.query('SELECT price FROM venues WHERE venue_id = $1', [venue_id]);
        const total_price = venueResult.rows[0].price * duration;

        // Create booking
        const result = await db.query(
            'INSERT INTO bookings (user_id, venue_id, event_date, duration, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, venue_id, event_date, duration, total_price, 'Pending']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookings = async (req, res) => {
    const user_id = req.user.id;
    try {
        const result = await db.query('SELECT * FROM bookings WHERE user_id = $1', [user_id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBooking, getBookings };
