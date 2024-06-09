const db = require('../database');


const createVenue = async (req, res) => {
    const { name, location, description, capacity, price, facilities, availability, images } = req.body;
    const owner_id = req.user.id;
    try {
        const result = await db.query(
            'INSERT INTO venues (owner_id, name, location, description, capacity, price, facilities, availability, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [owner_id, name, location, description, capacity, price, facilities, availability, images]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVenuesId = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query('SELECT * FROM venues WHERE venue_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getVenues = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM venues');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createVenue, getVenues, getVenuesId };
