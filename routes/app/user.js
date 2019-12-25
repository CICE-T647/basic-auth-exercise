const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
    res.status(200).json({ message: "OK USER!" });
});

module.exports = router;
