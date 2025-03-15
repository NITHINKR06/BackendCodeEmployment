const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    profilePhotoUrl: {
      type: String
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    about: {
      type: String
    },
    location: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Allow future admin role
      default: "user",
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    resetOTP: {
      type: String,
      default: null,
    },
    resetOTPExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
