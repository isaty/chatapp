var btn = document.querySelector('button')
var xhttp=new XMLHttpRequest
var myrequest=new Headers()
xhttp.onreadystatechange=function(){
if(this.status==200)
console.log("hteer")
}
btn.onclick=function(){
// xhttp.open('GET','/logout',true)
// xhttp.setRequestHeader('Authorization')
// xhttp.send()

console.log(myrequest.headers.get('cookie'))
}