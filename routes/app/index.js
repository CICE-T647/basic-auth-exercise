const Express = require("express");
const router = Express.Router();

router.use("/user", require("./user"));
router.use("/admin", require("./admin"));

module.exports = router;
