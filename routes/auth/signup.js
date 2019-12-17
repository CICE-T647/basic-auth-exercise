const Express = require("express");
const router = Express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt"); //para encriptar la contraseña, solo en una dirección. 
const validateSignUp = require("../../middlewares/validateSignUp")

router.post("/", validateSignUp, async(req, res)=>{
    const {username, password, role, name} = req.body; 
    
    try{
        const user = await User.findOne({username}) //findOne es para solo devolver uno, por eso funcionaria el if user, sino con user.length
        if (user) return  res.status(409).json({message: "El usuario ya existe"}) //409 es conflicto en el status Hacemos return para que no siga con el resto y no nos de el error de headers
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Hubo un problema"})
    }
    //El alcance es solo del anterior try, pdemos crear otro fuera

    //Generamos el sistema de seguridad de encriptación
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashPasss = bcrypt.hashSync(password, salt) //Recibe dos parámetros, el salt y las contraseñas

    console.log("HASHPASS", hashPasss)

    const user = new User({
        username, 
        password: hashPasss,
        name,
        role,
    })
    try{
        await user.save();
        res.status(200).json({message:`Usuario creado correctamente`, user})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Hubo un problema"})
    }
})

module.exports = router 