const express = require("express");
const router = express.Router();
const checkers = require("../../controller/checkers");
const mongoUser = require("../../controller/mongoUser");

router.post("/", async (req, res) => {
    try {
        checkers.checkHttpLoginParams(req.body);
        const { username, password } = req.body;
        try {
            const user = await mongoUser.searchUser(username);
            await mongoUser.checkUserPasswd(username, password);
            req.session.currentUser = user;
            res.status(200).json({ message: `User ${username} logged` });
        } catch (error) {
            res.status(404).json({ message: error });
        }
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

module.exports = router;
