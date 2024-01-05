const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./model/todo.js')
const cors = require('cors')

const app =express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/mytodo");

app.post('/add',(req, res)=>{
    const task = req.body.task;
    Todo.create({
        task : task
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
    })
})

app.get('/get', (req, res)=>{
    Todo.find()
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
})

app.put('/update:id',(req, res)=>{
    const {id} = req.params;
    Todo.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
})

app.delete('/delete:id', (req, res)=>{
    const {id}=req.params;
    Todo.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
})

app.listen(3001, (req, res)=>{
    console.log("Server is running on port 3001")
})

