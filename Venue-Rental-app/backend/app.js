const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
//const notificationRoutes = require('./routes/notificationRoutes');
const app = express();
require('dotenv').config();

const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/venues', venueRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
//app.use('/notifications', notificationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
