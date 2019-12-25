const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logout" });
});

module.exports = router;
