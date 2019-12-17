const Express = require("express");
const router = Express.Router();


router.use("/signup", require("./signup.js")); 
router.use("/login", require("./login.js")); 
router.use("/logout", require("./logout.js")); 


module.exports = router