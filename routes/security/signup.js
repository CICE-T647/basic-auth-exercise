const express = require("express");
const router = express.Router();
const userModel = require("../../models/user");

router.get("/", (req, res) => {
    res.status(200).json({ message: "OK!" });
});

module.exports = router;
