const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

// Get All User
// /api/users
// Metho GET
// ADMIN
module.exports.getAllUserCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({success:true, data: users });
});
