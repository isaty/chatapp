const mongoose=require('mongoose')
const ChatSchema=new mongoose.Schema({
   owner:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref:'User'
   },
   room:{
       type:String,
       default:"Every"
   },
   user:{
    type:String,
    required:true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }

})
const chat=new mongoose.model('chat',ChatSchema)
module.exports=chat