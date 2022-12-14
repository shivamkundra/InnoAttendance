const express = require("express");

const router = express.Router();
router.use("/register", require("./register"));
router.use("/markAttendance", require("./MarkAttendance"));
router.use("/user", require("./user"));
router.use("/markPresent", require("./MarkPresent"));

module.exports = router;
