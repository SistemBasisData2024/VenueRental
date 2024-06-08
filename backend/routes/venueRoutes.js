const express = require('express');
const { createVenue, getVenues } = require('../controllers/venueController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateJWT, createVenue);
router.get('/', getVenues);

module.exports = router;
