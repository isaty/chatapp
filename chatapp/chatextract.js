const chat=require('./models/chat')
const chatextract=async function(room){
   const chats=await chat.find({room})
   return chats
}
module.exports=chatextract