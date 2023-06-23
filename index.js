const express = require('express')
const{authenticate} = require('./middleware/authentication')
const {userRouter} = require('./routes/user.routes')
const {blogRouter} = require('./routes/blog.routes')
const {connection} = require('./db')
const app = express()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Home Page")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use('/blog',blogRouter)


app.listen(9090, async ()=>{
    await connection
    console.log("Running at port 9090")
})