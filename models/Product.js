const mongoose = require("mongoose");
const Joi = require("joi");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post Model
const Product = mongoose.model("Product", ProductSchema);

// validate Create Post
function validateCreateProduct(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(2).required(),
    price: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// validate Update Post
function validateUpdateProduct(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2),
    description: Joi.string().trim().min(2),
    price: Joi.string().trim(),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
}

// Create the Post model
module.exports = { Product, validateCreateProduct, validateUpdateProduct };
