const jwt = require('jsonwebtoken')
require('dotenv').config()

const {userModel} = require('../models/user.model')

const authenticate = async(req,res,next)=>{
    try{
     const token = req.headers.authorization
     const decoded = await jwt.verify(token,process.env.key)
     const id = decoded.userId
    if(!decoded){
        res.status(400).send({msg:"Not Decoded"})
    }else{
    const id = decoded.userId
    const user = await userModel.findById(id)
    const role = user.role
    const userId = user._id
    req.user = userId
    req.role = role
    }

     
     next()
    }
    catch(err){
     res.status(400).send({msg:err.message})
    }
}

module.exports = {
    authenticate
}