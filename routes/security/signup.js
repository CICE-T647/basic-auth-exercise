const express = require("express");
const router = express.Router();
const checkers = require("../../controller/checkers");
const mongoUser = require("../../controller/mongoUser");

router.post("/", async (req, res) => {
    try {
        checkers.checkHttpParams(req.body);
        const { username } = req.body;
        try {
            await mongoUser.searchUser(username);
        } catch (error) {
            await mongoUser
                .newUser(req.body)
                .then(() =>
                    res
                        .status(201)
                        .json({ message: `User ${username} created` })
                )
                .catch(err => {
                    if (err.name === "ValidationError") {
                        res.status(422).json({ message: err.message });
                    } else {
                        res.status(500).json({ message: err.message });
                    }
                });
        }
        res.status(409).json({ message: `User ${username} exists` });
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

module.exports = router;
