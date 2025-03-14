const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'], // Adjust statuses as needed
        default: 'pending',
        required: true
    },
    bookingDateTime: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
