const express=require('express')
const chat=new express.Router()
const auth=require('../auth/auth')

chat.get('/chat',auth,(req,res)=>{
    res.sendFile('C:/chatapp-master/chatapp/public/chat.html')
    })
chat.get('/room',auth,(req,res)=>{
        res.render('index')
        })
chat.post('/room',auth,(req,res)=>{
        if(!req.body.room)
            req.body.room="Every"
            res.cookie('room',req.body.room)
            res.redirect('chat')
    })    

module.exports=chat