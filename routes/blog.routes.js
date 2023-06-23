const express = require("express")
const {blogModel} = require('../models/blog.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {authorize} = require('../middleware/authorize')
const blogRouter = express.Router()


blogRouter.get("/",authorize(["User"]), async (req,res)=>{
   const token = req.headers.authorization
   const decoded = jwt.verify(token,process.env.key)
   console.log(decoded.userId)
   try{
    if(decoded){
        const blogs = await blogModel.find({user:decoded.userId})
        res.status(200).send(blogs)
    }
   }
   catch(err){
    res.status(200).send({msg:err.message})
   }
})



blogRouter.post("/addblog",authorize(["User","Admin"]),async(req,res)=>{
    const token = req.headers.authorization
    const {title,body,author} = req.body
    const decoded = jwt.verify(token,process.env.key)
    const id = decoded.userId
    console.log(id)
    try{
    const newblog = new blogModel({title,body,author,user:id})
    await newblog.save()
    res.status(200).send({msg:"New Blog Added"})
    }
    catch(err){
    res.status(400).send({msg:err.message})
    }
})


blogRouter.patch("/Update/:id",authorize(["User","Admin"]),async(req,res)=>{
    const load=req.body
    const userId = req.userId
    const id=req.params.id

    try {
        const data=await blogModel.find({user:userId})
        if(data){
            const blogdata=await blogModel.findByIdAndUpdate({_id:id},load)
            res.send({"msg":"Data updated"})
        }else{
            res.send({"msg":"User not found"})
        }
    } catch (err) {
        res.send({"err":err.message})
    }
})

blogRouter.delete("/deleteblog/:id",authorize(["Admin"]),async(req,res)=>{
   const id = req.params.id
   try{
    const deleteBlog = await blogModel.findByIdAndDelete({id})
    res.status(200).send({msg:"Blog Deleted"})
   }
   catch(err){
    res.status(400).send({msg:err.message})
   }
})

module.exports = {
    blogRouter
}