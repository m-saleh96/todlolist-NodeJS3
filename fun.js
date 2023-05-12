const fs = require('fs')
const filePath = process.env.FILE_PATH || "./db.json"


const TodoModel = require('./model/model')

function checkFS(path) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path,JSON.stringify([]))
    }
}
checkFS(filePath)



function add(req ,res) {
    TodoModel.create({...req.body} ,  (err , data)=> {
        if (!err) return res.status(201).json(data)
        console.log(err)
        res.status(500).json({Error : "DB_error"})
    })  
}


function edit(req , res) {
    const {id}= req.params
    let body = req.body.body
    let title =  req.body.title
    TodoModel.findByIdAndUpdate(id , {title:title , body:body}  , (err)=>{
        if (!err){
            TodoModel.findById(id ,(err,data)=>{
                if (!err) return res.status(201).json(data)
                    console.log(err)
                    res.status(500).json({Error : "DB_error"})
            })
        }
        else{
            console.log(err);
        }
     })

}

function remove(req , res) {
    const {id}= req.params
    TodoModel.findByIdAndDelete(id , (err, data)=>{
        if (!err){
            res.send( data);
        }
        else{
            console.log(err);
        }
     })

   
}



function list(req, res) {
    let todolist = []
    let {type} = req.query
    TodoModel.find({} ,(err , data)=>{
        todolist =data
    switch (type) {
        case "all":
            
            break;
        case "checked":
            todolist = todolist.filter((elem)=>elem.checked)
            break;
        case "unchecked":
            todolist = todolist.filter((elem)=>!(elem.checked))
            break;
        default:
            break;
    }
    if (!err) return res.status(200).json(todolist)
    console.log(err)
    res.status(500).json({Error : "DB_error"})
    }
    )
    
}


function check(req , res) {
    const {id}= req.params
    TodoModel.findByIdAndUpdate(id , {checked:true}  , (err)=>{
        if (!err){
            TodoModel.findById(id ,(err,data)=>{
                if (!err) return res.status(201).json(data)
                    console.log(err)
                    res.status(500).json({Error : "DB_error"})
            })
        }
        else{
            console.log(err);
        }
     })

}

function uncheck(req , res) {
    const {id}= req.params
    TodoModel.findByIdAndUpdate(id , {checked:false}  , (err)=>{
        if (!err){
            TodoModel.findById(id ,(err,data)=>{
                if (!err) return res.status(201).json(data)
                    console.log(err)
                    res.status(500).json({Error : "DB_error"})
            })
        }
        else{
            console.log(err);
        }
     })
}




module.exports = {add , edit , remove , list , check , uncheck}

