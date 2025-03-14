const Employee = require("../models/Employee");

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  // console.log(req.body)
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    // Copy the request body into updateData
    const updateData = { ...req.body };

    console.log(updateData)

    // If a file was uploaded, add its path to the update data
    if (req.file) {
      updateData.profilePhotoUrl = req.file.path;
    }

    // Update the employee record with the new data
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.log("Update Employee Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }  
};


// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
