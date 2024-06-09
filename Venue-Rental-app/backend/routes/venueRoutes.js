const express = require('express');
const { createVenue, getVenues, getVenuesId } = require('../controllers/venueController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateJWT, createVenue);
router.get('/', getVenues);
router.get('/:id', getVenuesId);

module.exports = router;
