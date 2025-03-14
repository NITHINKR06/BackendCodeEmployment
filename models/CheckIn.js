const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        enum: ['user'], // Restrict role values
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    resetOTP: { type: String },
    resetOTPExpires: { type: Date },
},
{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
