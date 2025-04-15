const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  from: String,
  to: String,
  callerId: String,
  transcript: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
