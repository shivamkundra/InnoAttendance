const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const MarkPresentController = require("../controllers/MarkPresentController");
// login required
router.post("/", fetchuser, MarkPresentController.present);

module.exports = router;
