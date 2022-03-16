const express = require("express");

const router = express.Router();

router.use("/Android", require("./Android"));
// router.use("/Web", require("./Web"));
// router.use("/ML", require("./ML"));
// router.use("/IOT", require("./IOT"));
// router.use("/ARVR", require("./ARVR"));
router.use("/user", require("./user"));

module.exports = router;
