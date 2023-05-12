const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes/todo')
const port = 5000

app.use(express.json())
app.use("/todo" , router)

mongoose.connect('mongodb://127.0.0.1:27017/todolist')

app.listen(port , (err)=>{
    if (!err) {
        console.log("listening")
    }
})
