const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    id:{ type:Number},
    title: {type: String , required : true},
    body: {type: String , required : true},
    checked: {type: Boolean , default: false},
})

const TodoModel = mongoose.model("todo" , todoSchema)

module.exports = TodoModel

