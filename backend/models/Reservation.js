const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  flightId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  flightDate: {
    type: Date,
    required: true
  },
  reservedAt: {
    type: Date,
    default: Date.now
  }
});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
