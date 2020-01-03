const jwt=require('jsonwebtoken')
const chat=require('./models/chat')
const generate = async(chatinfo,soc) => {
    try{
    const dec=jwt.verify(soc.token,'chat')
    let data={
        user:chatinfo.user,
        room:soc.room,
        owner:dec._id,
        text:chatinfo.text,
        createdAt:new Date().getTime()
    }
    console.log(soc.room)
    const Chat= new chat(data)
      await Chat.save()    
}
    catch(e){
     console.log(e)
    }
}
module.exports = generate