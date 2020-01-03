var socket=io()
var form=document.getElementById('message-form')
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
form.onsubmit=function(e){
e.preventDefault()
let data={
    text:document.querySelector('input').value,
    room:document.cookie.split(" ")[1].split('=')[1],
    user:document.cookie.split('=')[1].split(';')[0]}
    form.reset()
socket.emit('sendmessage',data,()=>{
console.log('delivered')
})}

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.data.text,
        user:message.data.user,
        createdAt: moment(message.data.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})