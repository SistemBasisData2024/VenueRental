const express = require('express');
const { register, login, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login, getAllUsers);
router.get('/getAllUsers', getAllUsers);

module.exports = router;