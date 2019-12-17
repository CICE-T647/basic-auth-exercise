const Express = require("express");
const router = Express.Router();


router.get("/", (req, res)=>{
    req.session.destroy(); 
    res.status(200).json({message: "logout"})
})

module.exports = router 