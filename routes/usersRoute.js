const router = require("express").Router();
const { getAllUserCtrl } = require("../controllers/usersCtr");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

//  /api/users
router.route("/users").get(verifyTokenAndAdmin,getAllUserCtrl);

module.exports = router;
