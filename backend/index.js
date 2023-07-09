const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user-routes')
const postRouter = require('./routes/post-routes')
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/post", postRouter)


mongoose.connect('mongodb+srv://user:user@cluster0.akaofpg.mongodb.net/?retryWrites=true&w=majority').
then(() => {
    console.log('db connected')
}).catch((err) => {
    console.log('db connection failed: ', err)
})

app.listen(9000, () => {
    console.log("server running on port 9000")
})