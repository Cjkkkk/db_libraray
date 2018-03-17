'use strict'
const fs = require('fs')
const login = async (ctx,next)=>{
    console.log(ctx.request)
    if(ctx.cookies.get("age")){
        console.log(ctx.cookies.get("age"))
    }else{
        ctx.cookies.set("age","1",{ httpOnly: true,domain:"127.0.0.1:8000"})
        console.log("no cookie")
        
    }
    ctx.response.set('Access-Control-Allow-Credentials', 'true')
    ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:7000');
    ctx.response.body = {
        data:"success"
    }
}





module.exports = {
    'POST /api/v1/user/login':login
}
