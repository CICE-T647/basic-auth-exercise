module.exports = ((req, res, next)=>{
    req.session.currentUser
    ? next() 
    : res.status(401).json({messsage: "Unauthorized"}); 
})