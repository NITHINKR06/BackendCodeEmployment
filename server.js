const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const dbConfig = require("./config/db");
const auth = require("./middleware/auth");
const path = require("path");

const app = express();

// Example of a protected route using auth middleware
app.get("/protected", auth, (req, res) => {
  res.json({ msg: "This is a protected route", user: req.user });
});

// Enable CORS for your React app
app.use(cors({
  origin: "http://localhost:3000"
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.use(express.urlencoded({ extended: true }));

// Serve static files (for profile photos, etc.)
app.use('/uploads/Employee', express.static(path.join(__dirname, 'uploads/Employee')));

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:",err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
