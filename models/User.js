const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// Define the user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Jwt
UserSchema.methods.generateAuthToke = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

// User Model
const User = mongoose.model("User", UserSchema);

// validation register user
function validationRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(3).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// validation login user
function validationLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(3).max(30).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Create the user model

module.exports = { User, validationRegisterUser, validationLoginUser };
