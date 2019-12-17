const Express = require("express");
const router = Express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt"); 

router.post("/", async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message: "El usuario no existe"})
        const passwordDB = user.password
        if(! bcrypt.compareSync(password, passwordDB)) return res.status(401).json({message: "LA contraseña no es correcta"})
        req.session.currentUser = user //Esto crea una session con el usuario
        res.status(200).json({message: "usuario logueado"})


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Hubo un problema"})
    }
})

module.exports = router 