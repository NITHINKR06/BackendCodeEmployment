const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  // References to the Employee and User documents
  employeeId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Employee', 
    // required: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    // required: true 
  },
  // Additional details about the booking
  jobName: { 
    type: String, 
    // required: true 
  },
  // User information
  userName: { 
    type: String, 
    // required: true 
  },
  userEmail: { 
    type: String, 
    // required: true 
  },
  mobileNumber: { 
    type: String, 
    // required: true 
  },
  // Booking timing details
  bookingTime: { 
    type: String,   // e.g., "03:30 PM" (12-hr format)
    // required: true 
  },
  bookingDate: { 
    type: Date, 
    // required: true,
    default: Date.now 
  },
  // Location details from the booking form
  location: { 
    type: String, 
    // required: true 
  },
  currentLocation: { 
    type: String, 
    // required: true 
  },
  // Booking status field (can be used to track confirmation, cancellation, etc.)
  status: { 
    type: String, 
    default: "pending" 
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
