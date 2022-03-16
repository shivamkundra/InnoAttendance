const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const AndroidController = require("../controllers/AndroidController");
// login required
router.get("/firstYear", fetchuser, AndroidController.firstYear);
// router.get("/secondYear", fetchuser, AndroidController.secondYear);
// router.get("/thirdYear", fetchuser, AndroidController.thirdYear);
// router.get("/fourthYear", fetchuser, AndroidController.fourthYear);

module.exports = router;
