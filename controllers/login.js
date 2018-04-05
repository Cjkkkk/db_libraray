'use strict'
const fs = require('fs')
const db = require('../db')


const login = async (ctx,next)=>{
    var id = ctx.request.body.id
    var password = ctx.request.body.password
    var result = await db.verify(id,password)
    console.log(result)
    if(result[1] == 1 || result[1] == 2 ){
        ctx.response.body = {
            message:result[0],
            name:"",
            status:result[1]
        }
    }else{
        ctx.cookies.set("id",id,{ httpOnly: true})
        ctx.cookies.set("password",password,{ httpOnly: true})
        console.log(`id ${id} cookie set`)
        // ctx.response.set('Access-Control-Allow-Credentials', 'true')
        // ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:7000');
        ctx.response.body = {
            message:'suc',
            name:result[0],
            status:result[1]
        }
    }
}

const status = async (ctx,next)=>{
    var id = ctx.cookies.get("id")
    var password = ctx.cookies.get("password")
    if(id && password){
        var result = await db.verify(id,password)
        if(result[1] == 1 || result[1] == 2 ){
            ctx.response.body = {
                message:result[0],
                name:"",
                status:result[1]
            }
        }else{
            console.log(result)
            ctx.response.body = {
                message:'suc',
                name:result[0],
                status:result[1]
            }
        }
    }else{
        //没有cookie
        ctx.response.body = {
            message:'fail',
            name:"",
            status:2
        }
    }
}

const logout = async (ctx,next)=>{
    ctx.cookies.set("id","",{ httpOnly: true})
    ctx.cookies.set("password","",{ httpOnly: true})
    ctx.response.body = {
        message:"成功注销"
    }
}



module.exports = {
    'POST /api/v1/user/login':login,
    'GET /api/v1/user/status':status,
    'GET /api/v1/user/logout':logout
}
