const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateJWT, createBooking);
router.get('/', authenticateJWT, getBookings);

module.exports = router;
