const express = require("express");
const router = express.Router();
const { bookEmployee, getUserBookings, getBookingById } = require("../controller/bookingController");

// Booking routes
router.post("/", bookEmployee);
router.get("/:userId", getUserBookings);
router.get("/status/:id", getBookingById);

module.exports = router;
