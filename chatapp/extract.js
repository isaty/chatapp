const user={}
const extract= function(cookies){
for(c in cookies){
    let ex=cookies[c].split('=')
    if(ex[0]=='token'){
        user.token=ex[1].replace(';','')
    }
    if(ex[0]=='room'){
        user.room=ex[1].replace(';','')
    }
}
return user
}
module.exports=extract