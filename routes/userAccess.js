const Express = require("express");
const router = Express.Router();
const isloggedIn = require("../middlewares/isLoggedIn")

router.get("/", isloggedIn, (req, res)=>{ //implementamos isLoggedIn en medio, el middleware, va sin llamar porque sino estaría llamando a req res etc...
    res.status(200).json({message: "Bienvenido usuario"})
})

module.exports = router 