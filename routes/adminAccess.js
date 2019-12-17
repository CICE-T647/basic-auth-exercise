const Express = require("express");
const router = Express.Router();
const isAdmin = require("../middlewares/isAdmin")


router.get("/", isAdmin, (req, res)=>{ 
    res.status(200).json({message: "Bienvenido administrador"})
})

module.exports = router 