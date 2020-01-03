const express = require('express')
const app = express()
const http = require('http')
const bodyparser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const chatroutes = require('./route/chatroutes')
const routes = require('./route/routes')
const socket = require('socket.io')
const cookie = require('cookie-parser')
//message generation
const generate = require('./generate')
//connection to databse server
require('./db/connect')
//cookie extraction of the socket connection
const extract = require('./extract')
const chatextract = require('./chatextract')

const server = http.createServer(app)
const io = socket(server)

//setting paths
const publicPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'views')

//setting views handlebars and view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//serving static files
app.use(express.static(publicPath))

//data parsing
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json({ extended: false }))

//cookies parsing
app.use(cookie())

//routing
app.use(routes)
app.use(chatroutes)

//receving socket connections and emitting
io.on('connection', async (socket) => {
    console.log("new connection")

    let ar = socket.request.headers.cookie.split(' ')
    let soc = extract(ar)
    socket.join(soc.room)
    // console.log(soc.room)
    //on opening of the new connection
    //below is a naive way to send chats to the user
    const chats = await chatextract(soc.room)
    for (chat in chats) {
        let data = {
            text: chats[chat].text,
            user: chats[chat].user,
            createdAt: Number(chats[chat].createdAt)
        }
        // console.log(chats[chat].room)
        socket.emit('message', { data })
    }
    //on a socket event
    socket.on('sendmessage', (data, callback) => {
        generate(data, soc)
        data.createdAt = new Date().getTime()
        console.log(data.room)
        io.to(data.room).emit('message', { data })
        callback()
    })

})


//listing to port 
server.listen(3000, () => {
    console.log("Server Up")
})