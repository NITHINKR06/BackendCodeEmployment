const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
    profilePhotoUrl: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    jobName: {
        type: String,
        required: function () { return this.role === 'employee'; }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee'],
        default: 'employee',
        required: true
    },
    location: {
        type: String,
        required: function () { return this.role === 'employee'; }
    },
    education: {
        type: String
    },
    experience: {
        type: Number, // representing years of experience
        default: 0
    },
    about: {
        type: String
    },
    reviews: [
        {
          name: { type: String, required: true },
          message: { type: String, required: true },
          rating: { type: Number, min: 1, max: 5, required: true },
          date: { type: Date, default: Date.now },
        },
    ],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    resetOTP: { 
        type: String 
    },
    resetOTPExpires: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
