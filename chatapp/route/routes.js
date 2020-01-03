const express = require('express')
const User = require('../models/user')
const auth=require('../auth/auth')
const routes = new express.Router()

routes.get('/register', async (req, res) => {
    res.render('register', { message: '' })
})
routes.post('/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.render('register', { message: 'Successfull' })
    }
    catch (e) {
        console.log(e)
        res.render('register', { message: 'Unsuccessfull' })
    }
})

routes.get('/login', async (req, res) => {
    res.render('login')
})
routes.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.password)
        const token = await user.generate()
        res.cookie('token',token,{maxage:30000,httpOnly:true})
        res.cookie('user',user.username)
        res.render('index')
    } catch (e) {
        console.log(e)
        res.render('login', e)
    }

})

routes.get('/logout',auth,async(req,res)=>{
try{
    req.user.tokens=req.user.tokens.filter((token)=>{
         return token.token!=req.token
    })
  await req.user.save()
 res.render('login')
}catch(e)
{
   res.render('index')
}
})



module.exports = routes