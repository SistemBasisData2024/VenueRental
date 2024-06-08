const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateJWT, createReview);
router.get('/:venue_id', getReviews);

module.exports = router;
