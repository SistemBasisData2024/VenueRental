const db = require('../database');

const createReview = async (req, res) => {
    const { venue_id, rating, comment } = req.body;
    const user_id = req.user.id;
    try {
        const result = await db.query(
            'INSERT INTO reviews (user_id, venue_id, rating, comment, review_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, venue_id, rating, comment, new Date()]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    const { venue_id } = req.params;
    try {
        const result = await db.query('SELECT * FROM reviews WHERE venue_id = $1', [venue_id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReview, getReviews };
