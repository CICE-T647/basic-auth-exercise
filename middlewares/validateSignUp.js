module.exports = ((req, res, next)=>{
    const {username, password, role, name} = req.body; 
    if (!username){
        return res.status(404).json({error: "No se ha definido usuario"})
    }
    if (!password){
        return res.status(404).json({error: "No se ha definido contraseña"})
    }
    if (!role){
        return res.status(404).json({error: "No se ha definido rol"})
    }
    if (!name){
        return res.status(404).json({error: "No se ha definido nombre"})
    }
    next(); 
})