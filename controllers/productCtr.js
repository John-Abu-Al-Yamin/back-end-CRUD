const asyncHandler = require("express-async-handler");
const {
  Product,
  validateCreateProduct,
  validateUpdateProduct,
} = require("../models/Product");

// Get All Products
// /api/product
// Metho GET
// Public
module.exports.getAllProductCtrl = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

// Get single Product
// /api/product/:id
// Metho GET
// Public
module.exports.getAllSingleCtrl = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Product Id" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, error: "No Product Found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// create products
// /api/product
// Metho POST
// ADMIN
module.exports.createProductCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validateCreateProduct(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Uploade products
// /api/product/:id
// Metho Put
// ADMIN
module.exports.updateProductCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validateUpdateProduct(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ success: false, error: "No Note Found" });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete products
// /api/product/:id
// Metho DELETE
// ADMIN
module.exports.deleteProductCtrl = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({ success: false, error: "No Note Found" });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
