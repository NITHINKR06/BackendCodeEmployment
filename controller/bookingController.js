// bookingController.js
const User = require("../models/CheckIn"); // your User model
const BookingsEmployee = require("../models/BookingsEmployee");
const Employee = require("../models/Employee");
const notificationService = require("../helper/notificationService");

exports.bookEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      userId,
      jobName,
      userName,
      userEmail,
      mobileNumber,
      bookingTime,
      bookingDate, // Optional; defaults to Date.now if not provided.
      location,
      currentLocation
    } = req.body;

    // Create a new booking instance.
    const newBooking = new BookingsEmployee({
      employeeId,
      userId,
      jobName,
      userName,
      userEmail,
      mobileNumber,
      bookingTime,
      bookingDate: bookingDate || Date.now(),
      location,
      currentLocation
      // "status" will default to "pending" per your booking schema.
    });

    await newBooking.save();

    // Add booking to User using the newBooking variable.
    await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } });

    // Add booking to Employee using the newBooking variable.
    await Employee.findByIdAndUpdate(employeeId, { $push: { bookings: newBooking._id } });

    // Fetch employee and user details for notifications.
    const employee = await Employee.findById(employeeId);
    const user = await User.findById(userId);

    // Emit new booking notification (to employee).
    notificationService.emit('newBooking', { employee, booking: newBooking });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // status should be "pending", "cancelled", or "confirmed"

    // Update booking document.
    const booking = await BookingsEmployee.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update booking status in both Employee and User models.
    await Employee.findByIdAndUpdate(booking.employeeId, { bookingStatus: status });
    await User.findByIdAndUpdate(booking.userId, { bookingStatus: status });

    // Fetch updated employee and user details for notifications.
    const employee = await Employee.findById(booking.employeeId);
    const user = await User.findById(booking.userId);

    // Emit booking status update notification (to both employee and user).
    notificationService.emit('bookingStatusUpdated', { employee, user, bookingStatus: status });

    res.json({
      message: "Booking status updated successfully",
      booking
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.getUserBookings = async (req, res) => {

  try {
    const { userId } = req.params;
    const bookings = await BookingsEmployee.find({ userId })
    res.json(bookings);
    // console.log(bookings,'bookings')
  } catch (error) {
    console.log("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params; // booking id
    const booking = await BookingsEmployee.findById(id);
    console.log(booking)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
