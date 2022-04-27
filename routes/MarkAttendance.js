const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const MarkAttendanceController = require("../controllers/MarkAttendanceController");
// login required
router.get("/:domain/:year", fetchuser, MarkAttendanceController.list);

module.exports = router;
