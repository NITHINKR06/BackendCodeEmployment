const mongoose = require('mongoose');

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
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    review: {
        type: String
    },
    resetOTP: { 
        type: String 
    },
    resetOTPExpires: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
