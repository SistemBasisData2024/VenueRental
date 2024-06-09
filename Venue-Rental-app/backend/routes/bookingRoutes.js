const express = require('express');
const { createBooking, getBookings, acceptBooking, cancelBooking } = require('../controllers/bookingController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateJWT, createBooking);
router.get('/', authenticateJWT, getBookings);
// Accept a booking
router.put('/accept/:booking_id', authenticateJWT, acceptBooking);

// Cancel a booking
router.put('/cancel/:booking_id', authenticateJWT, cancelBooking);

module.exports = router;
