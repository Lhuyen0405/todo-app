const User = require("../models/userModel");
const userService = require('../service/userService');
const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

module.exports = {
  getAllUsers
};
