module.exports = ((req, res, next)=>{
    if(req.session.currentUser){
    return req.session.currentUser.role === "ADMIN_ROLE" ? next() : res.status(401).json({messsage: "Unauthorized"}); 
    }
    res.status(401).json({messsage: "Unauthorized No logueado"}); 
})