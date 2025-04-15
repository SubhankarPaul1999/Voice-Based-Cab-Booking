const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.json()); // to parse JSON if needed
connectDB();
app.use('/api/booking', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
