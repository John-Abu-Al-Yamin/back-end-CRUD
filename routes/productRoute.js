const {
  getAllProductCtrl,
  getAllSingleCtrl,
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtr");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

router.route("/").get(verifyToken, getAllProductCtrl); //all Products
router.route("/:id").get(verifyToken, getAllSingleCtrl); //single products

router.route("/").post(verifyTokenAndAdmin, createProductCtrl); //create products ADMIN
router.route("/:id").put(verifyTokenAndAdmin, updateProductCtrl); //Update products ADMIN
router.route("/:id").delete(verifyTokenAndAdmin, deleteProductCtrl); //delete products ADMIN

module.exports = router;
