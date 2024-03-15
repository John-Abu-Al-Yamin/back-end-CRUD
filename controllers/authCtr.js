const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  User,
  validationRegisterUser,
  validationLoginUser,
} = require("../models/User");

// generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
// ///////////////

// Register
// router /api/auth/register
// method POST
// Public
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validationRegisterUser(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }

  // user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists " });
  }

  //   hash Passeord
  const salt = await bcrypt.genSalt(10);
  const hasdPasswoed = await bcrypt.hash(req.body.password, salt);

  // Create user save Db

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hasdPasswoed,
  });

  await user.save();

  // generateToken
  const token = user.generateAuthToke();

  // res to client
  res.status(201).json({success:true,token });
});

// login
// router /api/auth/login
// method POST
// Public
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validationLoginUser(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }

  // user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: "invalid Email or Password" });
  }

  // cheack the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    res.status(400).json({ message: "invalid Email or Password" });
  }

  const token = user.generateAuthToke();

  // res client
  res.status(200).json({
    id: user._id,
    isAdmin: user.isAdmin,
    token,
  });
});
