const authorize = (role)=>{
    return (req,res,next) => {
        const userRole = req.role
        if(role.includes(userRole)){
            next()
        }else{
            res.status(400).send({msg:"Not Authorized"})
        }
    }
}

module.exports = {authorize}
