const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const registerController = require("../controllers/registerController");
// login required
// router.get("/:domain/:year", fetchuser, registerController.add);
router.get("/", fetchuser, registerController.add);

module.exports = router;
